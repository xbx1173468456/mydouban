<template>
  <div class="app-home">
    <mt-header fixed title="Move"></mt-header>
    <input class="home-inp" type="text" placeholder="请输入搜索内容">
    <mt-navbar>
      <mt-tab-item id="h1">正在热映</mt-tab-item>
      <mt-tab-item id="h1">即将上映</mt-tab-item>
      <mt-tab-item id="h1">Top25</mt-tab-item>
    </mt-navbar>
    <mt-tab-container>
      <mt-tab-container-item>
        <mt-cell></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
   data(){
     return {
    value:''
     }
   },
  methods:{
    app(){
      var url="api/movie/in_theaters";
      this.axios.get(url).then(result=>{
        console.log(result);
      });
    }
  },
  created(){
    this.app();
  }
}
</script>
<style>
input.home-inp{
  margin-bottom: 0px;
}
</style>