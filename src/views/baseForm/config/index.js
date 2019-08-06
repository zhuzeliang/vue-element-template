const formConfig = (target) => {
  return {
    labelWidth: '160px',
    column: 3,
    submitText: '搜索',
    items: [
      {
        label: '活动名称活动名称',
        prop: 'name',
        type: 'input',
        rules: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }]
      },
      {
        label: '自定义组件',
        prop: 'text',
        formSolt: true,
        rules: [{
          required: true,
          message: '请输入自定义组件',
          trigger: 'blur'
        }]
      },
      {
        label: '活动选择',
        prop: 'province2',
        type: 'select',
        multiple: true,
        disabled: true,
        dicData: target.dicData
      },
      {
        label: '活动名称',
        prop: 'province3',
        type: 'input'
      },
      {
        label: '活动选择',
        prop: 'province4',
        type: 'select',
        multiple: true,
        disabled: true,
        dicData: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    ]
  }
}

export default formConfig
