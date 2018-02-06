<template>
  <div class="star">
    <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
    YES
  </div>
</template>

<script>

  // 星星長度
  const LENGTH = 5;
  // 星星對應class
  const CLS_ON = 'on'
  const CLS_OFF = 'off'
  const CLS_HALF = 'half'

  export default {
    props: {
      score: {
        type: Number,
        default: 4
      }
    },
    computed: {
      itemClasses(){
        // let result = [CLS_ON,CLS_ON,CLS_ON,CLS_ON,CLS_HALF]
        let result = []
        // 4.7 => 4.5   3.9 => 3.5    4.1 => 4.0
        // 對分數進行處理，向下取0.5的倍數
        let score = Math.floor(this.score * 2) / 2
        // 小數，控制半星
        let hasDecimal = score % 1 !==0
        // 整數控制全星
        let integer = Math.floor(this.score)

        // 全星
        for (let i=0; i<integer; i++){
          result.push(CLS_ON)
        }
        // 半星
        if (hasDecimal){
          result.push(CLS_HALF)
        }
        // 補OFF
        while(result.length < LENGTH){
          result.push(CLS_OFF)
        }

       return result   
      }
    }
      
  }
</script>

<style scoped>
.star{
  font-size: 0;
}

.star .star-item{
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}

.star .star-item:last-child{
  margin-right: 0;
}

/* 三種圖片類型 */
.star .on{
  background-image: url(star24_on@2x.png);
}
.star .half{
  background-image: url(star24_half@2x.png);
}
.star .off{
  background-image: url(star24_off@2x.png);
}
</style>