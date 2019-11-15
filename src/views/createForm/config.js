const formConfig = target => {
  return {
    labelWidth: '150px',
    column: 1,
    list: [
      {
        type: 'select',
        label: '合作模式',
        key: 'cooperationModel',
        rules: [
          {
            required: true,
            message: '合作模式不能为空',
            trigger: 'blur'
          }
        ],
        width: '200px',
        options: []
      },
      {
        type: 'input',
        label: '合作类型名称',
        key: 'name',
        rules: [
          {
            required: true,
            message: '合作类型名称不能为空',
            trigger: 'blur'
          },
          { max: 15, message: '合作类型名称最多15个字符', trigger: 'blur' }
        ],

        width: '200px',
        defaultValue: '',
        required: true,
        dataType: 'string',
        placeholder: '请输入合作类型名称'
      },
      {
        type: 'input',
        label: '合作类型英文名',
        key: 'code',
        rules: [
          {
            required: true,
            message: '合作类型英文名不能为空',
            trigger: 'blur'
          },
          { max: 15, message: '合作类型英文名最多15个字符', trigger: 'blur' },
          {
            pattern: /^[0-9a-zA-Z_]+$/,
            message: '合作类型英文名必须是数字，字母，下划线组成',
            trigger: 'blur'
          }
        ],
        width: '200px',
        defaultValue: '',
        required: true,
        dataType: 'string',
        pattern: '',
        placeholder: '请输入合作类型英文名'
      },
      {
        type: 'textarea',
        label: '合作类型描述',
        key: 'description',
        rules: [{ max: 40, message: '合作类型唯一标识最多20个字符', trigger: 'blur' }],
        width: '400px',
        defaultValue: '',
        placeholder: '请输入合作类型描述'
      },
      {
        type: 'custom',
        label: '合作类型适用范围',
        key: 'permission',
        rules: [
          {
            required: true,
            type: 'object',
            fields: {
              permissionList: { type: 'array', required: true, message: '合作类型适用范围不能为空' }
            },
            trigger: 'blur'
          }
        ],
        width: '',
        defaultValue: {},
        dataType: 'object'
      },
      {
        type: 'select',
        label: '签约类型',
        key: 'select',
        defaultValue: '纸质合同',
        multiple: false,
        disabled: false,
        clearable: false,
        placeholder: '',
        required: false,
        showLabel: false,
        width: '200px',
        rules: [
          {
            required: true,
            message: '签约类型必须选择',
            trigger: 'blur'
          }
        ],
        options: [
          {
            value: '纸质合同',
            label: '纸质合同'
          }
        ],
        filterable: false
      },
      {
        type: 'radio',
        label: '关联合作方案',
        key: 'relationCooperation',
        defaultValue: '',
        options: [],
        width: '',
        props: {
          value: 'cooperationType',
          label: 'cooperationTypeName'
        }
      },
      {
        type: 'custom',
        label: '参数配置',
        key: 'fieldList',
        width: '',
        defaultValue: [],
        dataType: 'array',
        placeholder: '',
        rules: [
          {
            required: true,
            type: 'array',
            message: '参数配置不能为空',
            trigger: 'blur'
          }
        ]
      },
      {
        type: 'radio',
        label: '合作类型状态',
        key: 'enabled',
        defaultValue: '',
        width: '',
        rules: [
          {
            required: true,
            message: '合作类型必须填写',
            trigger: 'blur'
          }
        ],
        options: [
          {
            value: 'Y',
            label: '生效'
          },
          {
            value: 'N',
            label: '无效'
          }
        ]
      },
      {
        type: 'date',
        label: '生效日期',
        key: 'effectiveDate',
        defaultValue: '',
        dateType: 'datetime',
        width: '',
        hidden: true,
        rules: [
          {
            required: true,
            message: '生效日期必须选择',
            trigger: 'blur'
          }
        ],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        }
      }
    ]
  }
}

export default formConfig
