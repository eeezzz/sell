<template>
  <div class="header">
    <!-- 頂部通欄 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" class="search-bar" placeholder="搜索店內商品">
      </form>
      
      <div class="more-wrapper">
        <a href="#" class="spelling-bt">拼單</a>
        <div class="more-bt"></div>
      </div>
    </div>

    <!-- 主題內容 -->
    <div class="content-wrapper">

    </div>

    <!-- 公告內容 -->
    <div class="bulletin-wrapper">

    </div>

  </div>
</template>

<script>
export default {
  props: {
    poiInfo:{
      type: Object,
      default: {}
    }
  }

}
</script>

<style>
  @import url("../../common/styles/style.css");
  @import url("Header.css");
</style>


