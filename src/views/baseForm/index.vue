<template>
  <div class="app-container">
    <standard-form v-model="obj" :options="options" @submit="submit" @reset="reset">
      <template slot="text">
        <el-input v-model="obj.text" placeholder="这里是自定的表单" />
      </template>
    </standard-form>
    <el-button type="primary" size="small" @click="submit">提交</el-button>
  </div>
</template>

<script>
import StandardForm from './components/StandardForm'
import formConfig from './config/index'

export default {
  name: 'Form',
  components: { StandardForm },
  data() {
    return {
      obj: {
        name: 100,
        text: 100
      },
      options: formConfig(this)
    }
  },
  watch: {
    'obj.province2': {
      handler(val) {
        this.options.items[0].display = true
      }
      // immediate: true,
      // deep: true
    }
  },
  mounted() {
    this.getOptions()
  },
  methods: {
    getOptions() {
      setTimeout(() => {
        this.dicData = [
          {
            value: 0,
            label: '黄金糕'
          },
          {
            value: 1,
            label: '蚵仔煎'
          },
          {
            value: 2,
            label: '龙须面'
          },
          {
            value: 3,
            label: '北京烤鸭'
          }
        ]
        this.obj.name = 999
        this.options = formConfig(this)
      }, 5000)
    },
    submit() {
      console.log(this.obj)
    },
    reset() {
      console.log(this.obj)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
