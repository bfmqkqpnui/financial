<template>
  <div class="topnav">
    <ul class="">
      <li class="focus">账套列表</li>
      <li class="">凭证列表</li>
      <li >会计账簿</li>
      <li>财务报表</li>
      <li>账套设置</li>
      <li>凭证打印</li>
      <li>历史数据</li>
      <li>自动配置</li>
    </ul>

    <div class="body">
      <booksTable></booksTable>
    </div>
  </div>
</template>

<script>
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    props: {
      menuList: {
        type: Array,
        default: []
      }
    },
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {}
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {},
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style scoped>
  .topnav {
    width: 100%;
    height: 50px;
    background: #2a333b;
  }

  .topnav ul {
    padding: 0 0 0 200px;
    height: 50px;
    line-height: 50px;
  }

  .topnav ul li {
    display: inline-block;
    color: #d3d3d3;
    margin: 0 10px;
    padding: 0 20px;
    text-align: center;
    cursor: pointer;
  }

  .topnav ul li:hover,.topnav ul li.focus {
    background-color: #5fbbfc;
    color: #fff;
  }

  .topnav span{
    display: inline-block;
  }
  .topnav span:before{
    content: url("./i/list.png");
    margin-right: .2rem;
    vertical-align: middle;
  }

  .topnav .body{
  }
</style>
