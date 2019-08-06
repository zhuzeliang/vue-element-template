<template>
  <div id="container">
    <BaseFlow :data="data" :get-data="save" />
  </div>
</template>

<script>
// import FlowData from "/flow";
import BaseFlow from './BaseFlow'
import flowJson from './flow.json'

export default {
  name: 'App',
  components: {
    BaseFlow
  },
  data() {
    return {
      data: flowJson
    }
  },
  methods: {
    save(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
#container {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
* {
  box-sizing: border-box;
  margin: 0px;
}
</style>
