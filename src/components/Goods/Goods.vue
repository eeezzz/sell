<template>
  <div class="goods">
    <!-- 分類 -->
    <div class="menu-wrapper">
      <ul>
        <!-- 專場 -->
        <li class="menu-item">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon" />
            {{container.tag_name}}
          </p>
        </li>

        <li class="menu-item" v-for="(item, index) in goods" :key="index">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon" />
            {{item.name}}
          </p>
        </li>
      </ul>

    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper">
      <ul>
        <!-- 專場 -->
        <li class="container-list">
          <div v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url">
          </div>
        </li>
        <!-- 具體分類 -->
        <li v-for="(item, index) in goods" :key="index" class="food-list">
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

            </li>
          </ul>
        </li>
      </ul>

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
  methods:{
    head_bg(picture){
      // console.log(picture)
      return "background-image: url("+ picture + ")"
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
