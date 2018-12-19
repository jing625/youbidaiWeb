<template>
  <div class="footer">
    <div class="container">
      <img src="@/assets/nav/nav_logo.png" class="youbi" alt="" width="98px" height="32px">
      <div class="help-work-company-wrapper">
        <p class="help">
          <span><router-link to="/loan">借款</router-link></span>
          <span><router-link to="/download">App下载</router-link></span>
          <span><router-link to="/help">帮助中心</router-link></span>
        </p>
        <p class="work">
          <span>电话号码：020-29011423</span>
          <span>工作时间：工作日周一至周五9:30-18:30</span>
        </p>
        <p class="company">
          <span>友情链接：</span>
          <a href="https://ifish.im/" target="_blank">云鱼</a>
          <a href="https://www.tuoluocaijing.cn/" target="_blank">陀螺财经</a>
          <a href="http://www.vvbtc.com/" target="_blank">Vvbtc</a>
          <a href="https://www.btb.com/" target="_blank">BTB</a>
          <a href="https://trade.mn/cn/" target="_blank">Trade</a>
          <a href="https://www.coinbox.hk/" target="_blank">Coinbox</a>
          <a href="https://pangolinminer.com/" target="_blank">穿山甲矿场</a>
        </p>
      </div>
      <div class="qrCode">
        <div class="qrCodeImg">
          <img src="@/assets/footer/pic_ewm_gzh.png" alt="" width="90px" height="90px">
          <img src="@/assets/footer/pic_ewm_service1.png" alt="" width="90px" height="90px">
          <img src="@/assets/footer/pic_ewm_service2.png" alt="" width="90px" height="90px">
        </div>
        <span class="gzh">扫描关注公众号</span>
        <span class="service1">扫描联系微信客服1</span>
        <span class="service2">扫描联系微信客服2</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer {
    height: 244px;
    border-top: 1px solid #EAEAEA;
  }

  .container {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    position: relative;
  }

  .youbi {
    position: absolute;
    top: 52px;
    left: 0;
  }

  .help-work-company-wrapper {

    height: 70px;
    font-size: 12px;
    font-family: MicrosoftYaHei, sans-serif;
    font-weight: 400;
    color: #666666;
    position: absolute;
    bottom: 53px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .help span {
    padding-right: 33px;
    cursor: pointer;
  }

  .help span:hover, .help span a:hover {
    color: #ff8a14;
    text-decoration: underline;
  }

  .help span:nth-child(2), .help span:nth-child(3) {
    padding-left: 33px;
    border-left: 1px solid #666666;
  }

  .work span {
    margin-right: 8px;
  }

  .company > a {
    margin-left: 12px;
    color: #666666;
  }

  .company > a:hover {
    color: #ff8a14;
    text-decoration: underline;
    cursor: pointer;
  }

  .qrCode {
    position: absolute;
    top: 57px;
    right: 0;
  }

  .qrCode img {
    margin: 0 36px;
  }

  .qrCode .gzh {
    position: absolute;
    top: 107px;
    left: 35px;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    font-family: MicrosoftYaHei, sans-serif;

  }

  .qrCode .service1 {
    position: absolute;
    top: 107px;
    left: 190px;
    font-family: MicrosoftYaHei, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #666666;

  }

  .qrCode .service2 {
    position: absolute;
    top: 107px;
    left: 354px;
    font-family: MicrosoftYaHei, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
  }
</style>
