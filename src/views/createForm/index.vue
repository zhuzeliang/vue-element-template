<template>
  <div class="">
    <generate-form
      ref="refForm"
      :data="formConfig"
      :value="value"
      :disabled="false"
      @onChange="handleChange"
    >
      <template slot="permission" slot-scope="scope">
        <el-input v-model="scope.model.permission" />
      </template>
    </generate-form>
  </div>
</template>

<script>
import generateForm from '@/components/GenerateForm'
import formConfig from './config'

export default {
  components: {
    generateForm
  },
  data() {
    return {
      value: {},
      formConfig: formConfig(this)
    }
  },
  methods: {
    submitForm() {
      this.$refs['refForm'].getData().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
