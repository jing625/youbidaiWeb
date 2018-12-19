<template>
  <div class="index">
    <div class="banner">
      <div class="bannerWall">
        <div class="button-wrapper">
          <button class="toBorrow" @click="goBTC">
            <router-link to="/loan">去借款</router-link>
          </button>
        </div>
      </div>
    </div>
    <div class="index-wrapper">
      <div class="currency-wrapper">
        <div class="currency line" :class="{activeFade:entrance}">
          <div class="BTC row" :class="{afterBG:hover.BTC}" @mouseenter="hover.BTC=true" @mouseleave="hover.BTC=false">
            <img src="@/assets/index/currencyIcon/icon_btc_hover.png" alt="" v-if="hover.BTC">
            <img src="@/assets/index/currencyIcon/icon_btc_default.png" alt="" v-else>
            <div :class="{afterBTC:hover.BTC}">BTC</div>
            <button @click="goBTC">马上借款</button>
          </div>
          <div class="ETH row" :class="{afterBG:hover.ETH}" @mouseenter="hover.ETH=true" @mouseleave="hover.ETH=false">
            <img src="@/assets/index/currencyIcon/icon_ETH_hover.png" alt="" v-if="hover.ETH">
            <img src="@/assets/index/currencyIcon/icon_ETH_default.png" alt="" v-else>
            <div :class="{afterBTC:hover.ETH}">ETH</div>
            <button @click="goETH">马上借款</button>
          </div>
          <div class="LTC row" :class="{afterBG:hover.LTC}" @mouseenter="hover.LTC=true" @mouseleave="hover.LTC=false">
            <img src="@/assets/index/currencyIcon/icon_ltc_hover.png" alt="" v-if="hover.LTC">
            <img src="@/assets/index/currencyIcon/icon_ltc_default.png" alt="" v-else>
            <div :class="{afterBTC:hover.LTC}">LTC</div>
            <button @click="goLTC">马上借款</button>
          </div>
          <div class="ETC row" :class="{afterBG:hover.ETC}" @mouseenter="hover.ETC=true" @mouseleave="hover.ETC=false">
            <img src="@/assets/index/currencyIcon/icon_ETC_hover.png" alt="" v-if="hover.ETC">
            <img src="@/assets/index/currencyIcon/icon_ETC_default.png" alt="" v-else>
            <div :class="{afterBTC:hover.ETC}">ETC</div>
            <button @click="goETC">马上借款</button>
          </div>
          <div class="GTC row" :class="{afterBG:hover.GTC}" @mouseenter="hover.GTC=true" @mouseleave="hover.GTC=false">
            <img src="@/assets/index/currencyIcon/icon_gtc_hover.png" alt="" v-if="hover.GTC">
            <img src="@/assets/index/currencyIcon/icon_gtc_default.png" alt="" v-else>
            <div :class="{afterBTC:hover.GTC}">GTC</div>
            <button @click="goGTC">马上借款</button>
          </div>
        </div>
      </div>
      <div class="advantage-wrapper">
        <div class="advantage line" :class="{activeFade:scrollHeight > entrance}">
          <div class="safety row">
            <img src="@/assets/index/advantageIcon/icon_safety.png" alt="">
            <h3>安全</h3>
            <div>冷钱包技术,安全可靠</div>
          </div>
          <div class="lowInterest row">
            <img src="@/assets/index/advantageIcon/icon_lowinterest.png" alt="">
            <h3>低利息</h3>
            <div>支持多币种低利息抵押</div>
            <div>灵活赎回</div>
          </div>
          <div class="celerity row">
            <img src="@/assets/index/advantageIcon/icon_celerity.png" alt="">
            <h3>快速</h3>
            <div>方便快捷，五分钟放款</div>
          </div>
          <div class="multi row">
            <img src="@/assets/index/advantageIcon/icon_multi-platform.png" alt="">
            <h3>多平台</h3>
            <div>多平台支持</div>
            <div>网页，安卓，IOS客户端</div>
          </div>
        </div>
      </div>
      <div class="partner-wrapper">
        <div class="partner line" :class="{activeFade:scrollHeight > 800}">
          <h2>合伙人简介</h2>
          <div>
            <img src="../assets/index/partnerImage/pic1.png">
            <span class="englishName">zhang jian</span>
            <p>
              2005年创办OPDA智能手机论坛，获得蔡文胜投资 <br>
              2012年创办指姆玩安卓游戏渠道，3.4亿被上市公司收购 <br>
              2014年创办广州速玩获得雷军顺为资本500万天使投资
            </p>
            <div class="partner-name">
              张健
            </div>
          </div>
          <div>
            <img src="../assets/index/partnerImage/pic2.png">
            <span class="englishName">zhang zhi hao</span>
            <p>
              boc天使投资人 <br>
              百码科技合伙人 <br>
              云鱼天使投资人 <br>
              顺发隆科技Ceo
            </p>
            <div class="partner-name">
              张智豪
            </div>
          </div>
          <div>
            <img src="../assets/index/partnerImage/pic1.png">
            <span class="englishName">name</span>
            <p>
              2005年创办OPDA智能手机论坛，获得蔡文胜投资 <br>
              2012年创办指姆玩安卓游戏渠道，3.4亿被上市公司收购 <br>
              2014年创办广州速玩获得雷军顺为资本500万天使投资
            </p>
            <div class="partner-name">
              名字
            </div>
          </div>
        </div>
      </div>
      <div class="project-wrapper">
        <div class="project line" :class="{activeFade:scrollHeight > 1450}">
          <h2>企业规划</h2>
          <img src="@/assets/index/projectIcon/circle_orange.png" alt="">
          <img src="@/assets/index/projectIcon/circle_orange.png" alt="">
          <img src="@/assets/index/projectIcon/circle_orange.png" alt="">
          <img src="@/assets/index/projectIcon/circle_orange.png" alt="">
          <img src="@/assets/index/projectIcon/circle_orange.png" alt="">
          <div class="VLine"></div>
          <div class="project1 row">
            <img src="@/assets/index/projectIcon/icon_project.png" alt="">
            <div>
              <h4>项目立项</h4>
              <div>在团队的推动中，项目的前期工作已经开展，并实现开发技术</div>
            </div>
          </div>
          <div class="project2 row">
            <img src="@/assets/index/projectIcon/icon_Closedbeta.png" alt="">
            <div>
              <h4>web，app(安卓、iOS)上线内测</h4>
              <div>快速实现支持多平台使用进行上线内测</div>
            </div>
          </div>
          <div class="project3 row">
            <img src="@/assets/index/projectIcon/icon_currency.png" alt="">
            <div>
              <h4>开放十种以上货币抵押</h4>
              <div>支持以BTC/ETH/ETC/LTC/BCH/GTC等货币抵押</div>
            </div>
          </div>
          <div class="project4 row">
            <img src="@/assets/index/projectIcon/icon_contract.png" alt="">
            <div>
              <h4>完成智能合约开发</h4>
              <div>提供优于传统合约的安全方法，并减少与合约相关的其他交易成本的开发</div>
            </div>
          </div>
          <div class="project5 row">
            <img src="@/assets/index/projectIcon/icon_distributionsystem.png" alt="">
            <div>
              <h4>上线平台利润分配机制</h4>
              <div>平台上线后公司对所实现的利润总额以及从联营单位分得的利润实行分配机制</div>
            </div>
          </div>
        </div>
      </div>
      <div class="company-wrapper">
        <div class="company line" :class="{activeFade:scrollHeight > 2150}">
          <h2>合作伙伴</h2>
          <div class="companyImg">
            <div>
              <a href="https://www.tuoluocaijing.cn/" target="_blank">
                <img src="@/assets/index/companyIcon/pic_pktop.png" alt="">
              </a>
              <a href="https://www.tuoluocaijing.cn/" target="_blank">
                <img src="@/assets/index/companyIcon/pic_ltcj.png" alt="">
              </a>
              <a href="https://ifish.im/" target="_blank">
                <img src="@/assets/index/companyIcon/pic_ifish.png" alt="">
              </a>
              <a href="http://www.vvbtc.com/" target="_blank">
                <img src="@/assets/index/companyIcon/pic_vvbtc.png" alt="">
              </a>
            </div>
            <div>
              <a href="http://www.coinbox.hk" target="_blank">
                <img src="@/assets/index/companyIcon/pic_coinbox.png" alt="">
              </a>
              <a href="https://pangolinminer.com/" target="_blank">
                <img src="@/assets/index/companyIcon/pic_pangolin.png" alt="">
              </a>
              <a href="https://www.btb.com/" target="_blank">
                <img src="@/assets/index/companyIcon/pic_btb.png" alt="">
              </a>
              <a href="https://trade.mn/cn/" target="_blank">
                <img src="@/assets/index/companyIcon/pic_trade.png" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        hover: {
          BTC: false,
          ETH: false,
          ETC: false,
          GTC: false,
          LTC: false,
        },
        scrollHeight: '',
        entrance: false
      }
    },
    methods: {
      handleScroll() {
        this.scrollHeight = window.scrollY;
      },
      goBTC() {
        this.$router.push({path: '/loan', query: {coin: 'btc'}})
      },
      goETH() {
        this.$router.push({path: '/loan', query: {coin: 'eth'}})
      },
      goLTC() {
        this.$router.push({path: '/loan', query: {coin: 'ltc'}})
      },
      goETC() {
        this.$router.push({path: '/loan', query: {coin: 'etc'}})
      },
      goGTC() {
        this.$router.push({path: '/loan', query: {coin: 'gtc'}})
      }
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    mounted() {
      setTimeout(() => {
        this.entrance = true
      }, 300)
    },

  }

</script>

<style scoped>
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }

  .banner {
    box-shadow: inset 0 3px 15px 0px rgba(255, 136, 0, 0.5);
    background-image: url(../assets/index/index_bg_color.png);
  }

  .bannerWall {
    width: 1200px;
    height: 550px;
    background-image: url(../assets/index/index_banner.png);
    background-position: center center;
    margin: 0 auto;
    position: relative;
  }

  /*---button--*/
  .button-wrapper {
    position: absolute;
    z-index: 2;
    left: 28px;
    bottom: 133px;
  }

  button.toBorrow,
  button.toBorrow::after {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  button.toBorrow {
    background: #ffffff;
    border: none;
    border-radius: 3px;
    display: block;
    position: relative;
    text-transform: uppercase;
    overflow: hidden;
    z-index: 2;
    cursor: pointer;
  }

  button.toBorrow > a {
    display: block;
    color: #F47D1D;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
    margin: 15px 33px;
  }

  button.toBorrow:hover > a {
    color: #ffffff;
  }

  button.toBorrow::before,
  button.toBorrow::after {
    background: #ed6b19;
    content: '';
    position: absolute;
    z-index: -2;
  }

  button.toBorrow::after {
    height: 0;
    left: 50%;
    top: 50%;
    width: 0;
  }

  button.toBorrow:hover:after {
    height: 100%;
    left: 0;
    top: 0;
    width: 100%;
  }

  /*-----*/

  .line {
    width: 1200px !important;
    margin: 0 auto;
  }

  .currency-wrapper, .partner-wrapper, .company-wrapper {
    background: #f7f7f7;
  }

  .advantage-wrapper, .project-wrapper {
    background: rgba(255, 255, 255, 1);
  }

  .currency {
    width: 1200px;
    height: 426px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(50px);
    transition: all 2s;
    opacity: 0;
  }

  .currency > .row {
    display: flex;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    /*-webkit-transition: all 1s;*/
  }

  .currency > .row > img {
    margin-top: 54px;
    margin-bottom: 11px;
  }

  .currency > .ETH > img, .currency > .ETC > img, .currency > .GTC > img {
    margin-top: 53px;
    margin-bottom: 10px;
  }

  .currency > .LTC > img {
    margin-top: 59px;

  }

  .currency > .row div {
    font-size: 16px;
    font-family: Arial-BoldMT;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }

  .currency > .row > button {
    width: 190px;
    height: 36px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 138, 20, 1);
    border-radius: 18px;
    outline: none;
    margin: 44px 14px 60px 14px;
    cursor: pointer;
    font-size: 16px;
    color: rgba(255, 138, 20, 1);
  }

  /* currency hover后样式  */
  .afterBG {
    background-image: url("../assets/index/currencyIcon/curve_hover_index.png");
  }

  .afterBTC {
    color: rgba(255, 255, 255, 1) !important;

  }

  /*---------*/

  .advantage {
    height: 424px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    transform: translateY(50px);
    transition: all 2s;
    opacity: 0;
  }

  .activeFade {
    transform: translateY(0) !important;
    opacity: 1 !important;
  }

  .advantage > .row {
    height: 162px;
    width: 156px;
    margin-top: 135px;
    text-align: center;
  }

  .advantage > .row > img {

  }

  .advantage > .row > h3 {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(65, 80, 97, 1);
    margin-top: 14px;
  }

  .advantage > .row > div {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-top: 12px;
  }

  .advantage > .row > div:nth-child(4) {
    margin-top: 8px;
  }

  .partner {
    height: 713px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    transform: translateY(50px);
    transition: all 2s;
    opacity: 0;
  }

  h2 {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
  }

  .partner > div {
    height: 469px;
    margin-top: 164px;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    position: relative;
    background-color: #ffffff;
  }

  .partner > div > img {
    vertical-align: middle;
  }

  .partner > div > span.englishName {
    position: absolute;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    line-height: 34px;
    border-radius: 2px;
    background: #FF8A14;
    color: #FFFFFF;
    padding: 0 20px;
    top: 242px;
    left: 30px;
  }

  .partner > div > p {
    display: block;
    width: 312px;
    height: 120px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #999999;
    line-height: 24px;
    margin: 30px auto 2px;
  }

  .partner > div > div.partner-name {
    line-height: 56px;
    color: #FF8A14;
    font-size: 16px;
    border-top: 1px solid #EAEAEA;
    padding-left: 29px;
  }

  .project {
    width: 100%;
    height: 747px;
    position: relative;
    transform: translateY(50px);
    transition: all 2s;
    opacity: 0;
  }

  .project > img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 190px;
    z-index: 1;
  }

  .project > img:nth-child(2) {
    top: 296px;
  }

  .project > img:nth-child(3) {
    top: 396px;
  }

  .project > img:nth-child(4) {
    top: 504px;
  }

  .project > img:nth-child(5) {
    top: 609px;
  }

  .project > .VLine {
    width: 1px;
    height: 440px;
    position: absolute;
    border: 1px solid #CCCCCC;
    left: 50%;
    transform: translateX(-25%);
    border-right: transparent;
    top: 190px;
    /*z-index: 0;*/
  }

  .project > .row {
    width: 398px;
    height: 74px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
  }

  .project > .row > div {
    line-height: 24px;
  }

  .project > .row > img {
    margin-right: 40px;
  }

  .project > .row > div > h4 {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(21, 41, 121, 1);
    margin-bottom: 8px;
  }

  .project > .row > div > div {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-top: 4px;
  }

  .project > .project1 {
    left: 172px;
    top: 180px;
  }

  .project > .project3 {
    left: 172px;
    top: 383px;
  }

  .project > .project5 {
    left: 172px;
    bottom: 80px;
  }

  .project > .project2 {
    right: 162px;
    top: 270px;
  }

  .project > .project4 {
    right: 162px;
    bottom: 187px;
  }

  .company {
    width: 100%;
    height: 395px;
    position: relative;
    overflow: auto;
    transform: translateY(50px);
    transition: all 2s;
    opacity: 0;
  }

  .company > .companyImg {
    width: 100%;
    /*height: 170px;*/
    margin-top: 96px;
    overflow: auto;
  }

  .company > .companyImg > div {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }

  .company > .companyImg > div > a > img {
    transition: all 0.3s;
  }

  .company > .companyImg > div > a > img:hover {
    background-color: #ffffff;
  }
</style>
