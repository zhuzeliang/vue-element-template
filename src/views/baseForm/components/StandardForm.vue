<template>
  <el-form
    ref="form"
    size="small"
    :model="value"
    class="standard-form"
    :label-width="currentOptions.labelWidth"
  >
    <el-row
      :gutter="20"
      type="flex"
    >
      <template v-for="item in currentOptions.items">
        <el-col
          v-if="!item.display"
          :key="item.prop"
          :xs="responsiveLayout.xs"
          :sm="responsiveLayout.sm"
          :md="responsiveLayout.md"
          :lg="responsiveLayout.lg"
        >
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :rules="item.rules"
          >
            <template v-if="item.formSolt">
              <slot :name="item.prop" />
            </template>
            <template v-if="item.type === 'input'">
              <el-input v-model="value[item.prop]" />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="value[item.prop]"
                placeholder="请选择"
              >
                <el-option
                  v-for="option in item.dicData"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <div v-if="options.items" style="text-align:center">
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">{{ options.submitText }}</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>

const defaultOptions = {
  labelWidth: '100px',
  column: 1,
  items: [],
  submitText: '保存'
}
const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}

export default {
  name: 'StandardForm',
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    }
  },
  data() {
    return {
      currentValue: {}
    }
  },
  computed: {
    currentOptions() {
      return {
        ...defaultOptions,
        ...this.options
      }
    },
    responsiveLayout() {
      const { column } = this.currentOptions
      return responsive[column]
    }
  },
  watch: {
    // value: {
    //   handler(val) {
    //     this.currentValue = cloneDeep(val)
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        this.$emit('submit')
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    }
  }
}
</script>
<style lang='scss' scoped>
.standard-form{
  .el-row--flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .el-select{
    width: 100%
  }
}
</style>
