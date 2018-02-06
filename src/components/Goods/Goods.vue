<template>
  <div class="goods">
    <!-- 分類 -->
    <div class="menu-wrapper">

    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper">

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      container: {},
      goods: [],
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
          _this.container = dataSource.data.container_operation_source
          _this.goods = dataSource.data.food_spu_tags
          console.log(_this.container)
          console.log(_this.goods)
        }
      })
      .catch((error)=>{
        console.log(error)
      })

  }
}
</script>

<style scoped>
  @import url("Goods.css");
</style>
