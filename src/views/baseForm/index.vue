<template>
  <div class="app-container1" style="overflow-y:auto;">
    <standard-form v-model="obj" :options="options" style="height:1200px" @submit="submit" @reset="reset">
      <template slot="text">
        <el-input v-model="obj.text" placeholder="这里是自定的表单" />
      </template>
    </standard-form>
    <el-button type="primary" size="small" @click="submit">提交</el-button>
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :lazy="true"
    />
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :lazy="true"
    />
  </div>
</template>

<script>
import StandardForm from './components/StandardForm'
import formConfig from './config/index'

import ElImage from '@/components/Image'

export default {
  name: 'Form',
  components: {
    StandardForm,
    ElImage

  },
  data() {
    return {
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg&refer=http%3A%2F%2Fa0.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614849326&t=a5419e5eb645ebf62c99a30c7b234778',
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
