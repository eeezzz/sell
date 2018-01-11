<template>
  <div id="app">
    <!-- 頭部 -->
    <MyHeader></MyHeader>
    
    <!-- 導航 -->
    <my-nav></my-nav>

    <!-- 主體內容 -->
    <div class="content">
      content
    </div>

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
  }
}
</script>

<style>

</style>
