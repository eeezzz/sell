<template>
  <div class="header" :style="header_bgi">
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
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>

    <!-- 主題內容 -->
    <div class="content-wrapper">
      <div class="icon" :style="icon_bgi">
      </div>
      <div class="name">
        <h3>{{ poiInfo.name }}</h3>
      </div>
      <div class="collect">
        <img src="../../../resource/img/star.png">
        <span>收藏</span>
      </div>
    </div>

    <!-- 公告內容 -->

    <div class="bulletin-wrapper" @click="showDetail">
      <img class="icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" alt="">
      <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
      <div class="detail" v-if="poiInfo.discounts2" >
        {{poiInfo.discounts2.length}}個活動
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!-- 公告詳請 -->
    <transition name="detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="main-wrapper" :style="detail_bgi">
            <div class="icon" :style="icon_bgi"></div>
            <h3 class="name">{{ poiInfo.name }}</h3>
            <!-- 評價 -->
            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i>
              {{poiInfo.shipping_fee_tip}}<i>|</i>
              {{poiInfo.delivery_time_tip}}
            </p>
            <p class="time">
              配送時間： {{ poiInfo.shipping_time }}
            </p>
            <div class="discounts">
              <p>
                <img v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" alt="">
                <span v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <div class="close-wrapper" @click="showDetail">
            <span class="icon-close"></span>
          </div>
        </div>

      </div>
    </transition>

  </div>
</template>

<script>
export default {
  props: {
    poiInfo:{
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isShow: false //公告詳情是否顯示
    }
  },
  computed: {
    header_bgi(){
      return "background-image: url("+ this.poiInfo.head_pic_url + ")"
    },
    icon_bgi(){
      return "background-image: url("+ this.poiInfo.pic_url + ")"
    },
    detail_bgi(){
      return "background-image: url("+ this.poiInfo.poi_back_pic_url+ ")"
    },

  },
  methods: {
    showDetail(){
      this.isShow = !this.isShow
    }
  }

}
</script>

<style>
  @import url("../../common/styles/style.css");
  @import url("Header.css");
</style>


