<template>
  <div class="invite">
    <div class="img-wrapper">
      <img src="../../assets/default/default_pic.png" width="298" alt="">
    </div>
    <h4>程序大大努力开发中...</h4>
  </div>
</template>

<script>
  export default {
    name: "Invite"
  }
</script>

<style scoped>
  .invite {
    width: 990px;
    height: 625px;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    border-radius: 3px;
  }
  .img-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 180px;
  }
  h4{
    font-size: 16px;
    color: #666666;
    width: 160px;
    text-align: center;
    margin: 20px auto 0px auto;
  }
</style>
