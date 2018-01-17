<template>
  <div id="app">
    <!-- 頭部 -->
    <MyHeader :poiInfo="poiInfo"></MyHeader>
    
    <!-- 導航 -->
    <my-nav></my-nav>

    <!-- 主體內容 -->
    <!-- <div class="content">
      content
    </div> -->
    <router-view></router-view>

  </div>
</template>

<script>
import MyHeader from './components/Header/Header'
import MyNav from './components/Nav/Nav'

export default {
  name: 'app',
  components: {
    MyHeader,
    MyNav
  },
  data(){
    return {
      // Header組件需要的商家資料
      poiInfo: {}    
    }
  },
  created(){
    let _this = this
    // 發起異步請求，獲取數據
    this.$axios.get('api/goods')
      .then((response)=>{
        // console.log(response)
        let dataSource = response.data
        if (dataSource.code == 0){
          _this.poiInfo = dataSource.data.poi_info;
          console.log(_this.poiInfo)
        }
      })
      .catch((error)=>{
        console.log(error)
      })

  }
}
</script>

<style>

</style>
