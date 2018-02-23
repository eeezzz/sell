<template>
  <div class="goods">
    <!-- 分類 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 專場 -->
        <li class="menu-item" :class="{'current':currentIndex===0}" @click="selectMenu(0)">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon" />
            {{container.tag_name}}
          </p>
        </li>

        <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current':currentIndex===index+1}" @click="selectMenu(index+1)">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon" />
            {{item.name}}
          </p>
          <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
        </li>
      </ul>

    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 專場 -->
        <li class="container-list food-list-hook">
          <div v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url">
          </div>
        </li>
        <!-- 具體分類 -->
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h3 class="title">{{item.name}}</h3>

          <!-- 具體商品列表 -->
          <ul>
            <li v-for="food in item.spus" :key="food.id" class="food-item">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img :src="food.product_label_picture" alt="" class="product">
                <p class="price">
                  <span class="text">RMB {{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>

    </div>

    <shopcart 
      :selectFoods="selectFoods"
      :shipping_fee_tip="poiInfo.shipping_fee_tip" 
      :min_price_tip="poiInfo.min_price_tip" 
    >
    </shopcart>
  </div>
</template>

<script>
// 導入BScroll
import BScroll from 'better-scroll'
import Shopcart from '../shopcart/shopcart'
import Cartcontrol from '../Cartcontrol/Cartcontrol'

export default {
  data(){
    return {
      container: {},
      goods: [],
      poiInfo: {},
      listHeight: [],
      scrollY: 0,
      menuScroll: {},
      foodScroll: {},
    }
  },
  methods:{
    head_bg(picture){
      // console.log(picture)
      return "background-image: url("+ picture + ")"
    },
    initScroll(){
      
      this.menuScroll = new BScroll(this.$refs.menuScroll, { 
        click: true 
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3,
        click: true 
      })

      // 添加滾動監聽事件
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        console.log(this.scrollY)
      })
    },
    calculateHeight(){
      // 通過refs獲取到對應的元素
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      // 添加到數組區間
      let height = 0;
      this.listHeight.push(height)
      for(let i=0; i<foodlist.length; i++)
      {
        let item = foodlist[i]
        // 高度需累加
        height += item.clientHeight
        this.listHeight.push(height)

      }
    },
    selectMenu(index){
      console.log('selectIndex->',index)
      // 通過refs獲取到對應的元素
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      // 根據下標，滾動到相對應的元素
      let el = foodlist[index]
      this.foodScroll.scrollToElement(el, 250)

    },
    // 計算各分類購買數量
    calculateCount(spus){
      let count = 0
      spus.forEach((food)=>{
        if(food.count>0){
          count+= food.count
        }
      })
      return count
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
          _this.poiInfo = dataSource.data.poi_info
          console.log(_this.container)
          console.log(_this.goods)
         
          // 目前Dom元素並沒有被渲染（即高度是問題）
          // 調用$nextTick後，Dom已經更新
          // 這時再調用滾動的初始方法
          _this.$nextTick(()=>{
            _this.initScroll()
            // 計算分類區間高度
            _this.calculateHeight()
          })
        }
      })
      .catch((error)=>{
        console.log(error)
      })


  },
  components: {
    Shopcart,
    Cartcontrol
  },
  computed: {
    // 根據右側的滾動位置，確定對應的索引下標
    currentIndex(){
      for(let i=0; i<this.listHeight.length; i++){
        // 取得商品區範圍
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]

        // 判斷是否在區間中
        if (!height2 || this.scrollY>=height1 && this.scrollY<height2){
          console.log('currentIndex=>',i)
          return i
        }
      }
      return 0
    },
    // 當Cartcontrol異動food值後,會重新計算
    selectFoods(){
      let foods = []

      this.goods.forEach((good)=>{
        good.spus.forEach((food)=>{
          if(food.count>0){
            foods.push(food)
          }
        })
      })
      
      // console.log('Good.selectFoods =>', foods)
      return foods
    }
  },

}
</script>

<style scoped>
  @import url("Goods.css");
</style>
