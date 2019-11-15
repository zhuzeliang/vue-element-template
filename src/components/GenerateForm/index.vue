<template>
  <el-form
    ref="generateForm"
    :model="models"
    :label-width="data.labelWidth"
    label-suffix=":"
    size="small"
    class="generate-form"
  >
    <el-row :gutter="20" type="flex">
      <template v-for="item in data.list">
        <el-col
          :key="item.key"
          :xs="responsiveLayout.xs"
          :sm="responsiveLayout.sm"
          :md="responsiveLayout.md"
          :lg="responsiveLayout.lg"
        >
          <template v-if="item.type == 'custom'">
            <el-form-item
              v-if="!item.hidden"
              :label="item.label"
              :prop="item.key"
              :rules="item.rules"
            >
              <slot :name="item.key" :model="models" :options="item" />
            </el-form-item>
          </template>
          <generate-form-item
            v-else
            :key="item.key"
            :models.sync="models"
            :remote="remote"
            :widget="item"
            :disabled="disabled"
            @input-change="onInputChange"
          />
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import GenerateFormItem from './GenerateFormItem'

const defaultOptions = {
  labelWidth: '100px',
  column: 1,
  list: [],
  submitText: '保存'
}
const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}

export default {
  name: 'GenerateForm',
  components: {
    GenerateFormItem
  },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    remote: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      models: {}
    }
  },
  computed: {
    responsiveLayout() {
      const { column } = this.data
      return responsive[column]
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(val) {
        this.handleConfig(val.list)
      }
    },
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        this.models = { ...this.models, ...val }
      }
    }
  },
  methods: {
    handleConfig(genList = []) {
      genList.forEach((_, i) => {
        if (this.value && Object.keys(this.value).includes(genList[i].key)) {
          this.models[genList[i].key] = this.value[genList[i].key]
        } else {
          if (genList[i].type === 'custom') {
            this.$set(
              this.models,
              genList[i].key,
              genList[i].dataType === 'string' ? '' : genList[i].dataType === 'object' ? {} : []
            )
          } else {
            this.models[genList[i].key] = genList[i].defaultValue
          }
        }
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            resolve(this.models)
          } else {
            reject(new Error('表单数据校验失败').message)
          }
        })
      })
    },
    reset() {
      this.$refs.generateForm.resetFields()
    },
    onInputChange(value, field) {
      this.$emit('onChange', field, value, this.models)
    }
  }
}
</script>
<style lang="scss" scoped>
.generate-form {
  /deep/ .el-row--flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .el-rate {
      margin-top: 6px;
    }
  }
  /deep/ .el-select {
    width: 100%;
  }
}
</style>
