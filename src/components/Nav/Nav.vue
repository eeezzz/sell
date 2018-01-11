<template>
  <div class="nav">

    <router-link to="/goods" class="nav-item">
      點菜
      <i class="line" />
    </router-link>

    <router-link to="/ratings" class="nav-item">
      評價
      <i class="line" />
    </router-link>

    <router-link to="/seller" class="nav-item">
      商家
      <i class="line" />
    </router-link>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  * {
    /* border: 1px solid black; */
  }
  
  .nav{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e4e4e4
  }

  .nav .nav-item{
    flex: 1; /* let all the flexible items be the same lenght */
    text-align: center;
    font-size: 13px;
    text-decoration: none;
    color: #666666;
  }

  .nav .active{
    color: #FFBB22;

  }

  .nav .active .line{
    width: 40px;
    height: 2px;
    background: #FFBB22;
    display: block;
    margin-top: -2px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
</style>

