<template>
  <div class="shopcart" :class="{'highLight':totalCount>0}">
    <div class="content-left">
      <div class="logo-wrapper" :class="{'highLight':totalCount>0}">
        <span class="icon-shopping_cart logo" :class="{'highLight':totalCount>0}"></span>
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <p class="total-price" v-show="totalPrice">¥{{totalPrice}}</p>
        <p class="tip" :class="{'highLight':totalCount>0}">另需{{shipping_fee_tip}}</p>
      </div>
    </div>

    <div class="content-right" :class="{'highLight':totalCount>0}">
      {{payStr}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      min_price_tip: {
        type: String,
        default: ''
      },
      shipping_fee_tip: {
        type: String,
        default: ''
      },
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              min_price: 10,
              count: 2
            },
            {
              min_price: 7,
              count: 5
            },
          ];
        }
      } 

    },
    computed: {
      // 總個數
      totalCount() {
        let num = 0
        this.selectFoods.forEach((food) => {
          num+= food.count
        })
        return num
      },
      // 總價格
      totalPrice(){
        let price=0
        this.selectFoods.forEach((food)=>{
          price+= food.count * food.min_price
        })
        return price
      },
      payStr(){
        if(this.totalCount>0){
          return "去結算"
        }else{
          return this.min_price_tip
        }

      }
    }
  }
</script>

<style scoped>
@import url('shopcart.css');
</style>