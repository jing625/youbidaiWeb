<template>
  <div class="download">
    <div class="wrapper" :style="'height:' + bgHeight + 'px;'">
      <div class="container">
        <h1>有币贷app</h1>
        <h1>支持多种数字货币</h1>
        <div class="show-wrapper">
          <div class="btn-wrapper">
            <button @click="selectIOS" :class="{btnColorSelected:btnColorSelected,btnColorDefault:!btnColorSelected}">
              <img src="@/assets/download/ios.png" alt="">
              <span>IOS下载</span>
            </button>
            <button @click="selectAndroid"
                    :class="{btnColorSelected:!btnColorSelected,btnColorDefault:btnColorSelected}">
              <img src="@/assets/download/anzhuo.png" alt="">
              <span>安卓下载</span>
            </button>
          </div>
          <div class="qrCode-wrapper">
            <img v-if="btnColorSelected" src="@/assets/download/ios-app.png" alt="ios下载" width="101">
            <img v-else src="@/assets/download/android-app.png" alt="ios下载" width="101">
            <span>扫描二维码下载</span>
          </div>
        </div>
        <img src="@/assets/download/iphone.png" class="iphone">
        <img src="@/assets/download/BTC.png" class="BTC">
        <img src="@/assets/download/EOS.png" class="EOS">
        <img src="@/assets/download/ETC.png" class="ETC">
        <img src="@/assets/download/GTC.png" class="GTC">
        <img src="@/assets/download/LTC.png" class="LTC">
      </div>
    </div>
  </div>
</template>

<script>
  import {appIos, appAndroid} from "@/api/app";

  export default {
    name: "Download",
    data() {
      return {
        btnColorSelected: true
      }
    },
    mounted() {

    },
    methods: {
      selectIOS() {
        this.btnColorSelected = true
      },
      selectAndroid() {
        this.btnColorSelected = false
      },
      download() {
        appAndroid().then(res => {

        })
      },

    },
    computed: {
      bgHeight() {
        var pageWidth = window.innerWidth
        console.log(1212312)
        console.log(pageWidth)
        return pageWidth * (738/ 1745)
      }
    }

  }
</script>

<style scoped>
  .download {
    margin-bottom: 30px;
  }

  .wrapper {
    background: url(../assets/download/bg.png) no-repeat;
    /*width: 100%;*/
    /*height: 10.84375rem;*/
    /*box-shadow: inset 0px 3px 10px 0px rgba(0, 0, 0, 0.1);*/
    background-size: cover;
    background-position: center;
    min-height: 738px;

  }

  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: auto;
  }

  .container h1 {
    font-size: 56px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #333333;
    line-height: 56px;
  }

  .container h1:nth-child(1) {
    margin: 182px 0 25px 0;
  }

  .show-wrapper {
    display: flex;
    margin-top: 43px;
  }

  .btn-wrapper {
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .container button {
    height: 43px;
    width: 152px;
    border: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .container button:nth-child(1) {
    margin-bottom: 30px;
  }

  .container button > span {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #ffffff;
    margin-left: 10px;
  }

  .btnColorSelected {
    background: #FF8A14;
  }

  .btnColorDefault {
    background: #1C2228;
  }

  .show-wrapper .qrCode-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .show-wrapper .qrCode-wrapper > span {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #333333;
    margin-top: 7px;
    line-height: 14px;
  }

  /*----img-----*/
  .container .iphone {
    position: absolute;
    top: 102px;
    right: 156px;
  }

  .container .BTC {
    position: absolute;
    top: 524px;
    right: 68px;
  }

  .container .EOS {
    position: absolute;
    top: 186px;
    left: 444px;
  }

  .container .ETC {
    position: absolute;
    bottom: 34px;
    left: 500px;
  }

  .container .GTC {
    position: absolute;
    top: 50px;
    left: 14px;
  }

  .container .LTC {
    position: absolute;
    bottom: 144px;
    left: 29px;
  }

</style>
