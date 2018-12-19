<template>
  <div class="loanPledge">
    <div class="container" v-if="$route.path === '/loan/pledge'">
      <header>
        <h3>{{order.coinCode}}充值</h3>
        <div>当前可用余额：{{order.availableCoinQuantity}}{{order.coinCode}}</div>
      </header>
      <main>
        <div class="warning">
          <img src="@/assets/loan/icon_hint.png">
          <span>{{order.tip}}</span>
        </div>
        <div class="coin">
          <h4>还需转入</h4>
          <h2>{{order.rechargeCoinQuantity}} 个{{order.coinCode}}</h2>
        </div>
        <h3>扫描此二维码充币</h3>
        <div id="qrCodeImg"></div>
        <div class="address">
          <h2>充币地址：{{order.address}}</h2>
          <button v-clipboard="order.address" @success="copySuccess">复制</button>
        </div>
        <button @click="dialogVisible = true">我已充币，下一步</button>
        <button @click="cancelOrder">取消订单</button>
      </main>
      <el-dialog :visible.sync="dialogVisible" width="480px" :before-close="handleClose">
        <p>请输入到期后退币的地址</p>
        <div class="coinAddress">
          <input type="text" placeholder="请输入退币地址" v-model="userAddress">
        </div>
        <div class="warning">
          注：请谨慎输入，还款后，平台将会原路退回你的充币地址，如因个人输入地址错误导致币退回失败，平台概不负责
        </div>
        <span slot="footer" class="dialog-footer">
             <router-link :to="{path:'/loan/pledge/make',query:{loanId: loanId}}">
               <el-button class="confirmSet" type="primary" @click="confirmLoan">确定质押借款</el-button>
             </router-link>
        </span>
      </el-dialog>
      <button @click="dialogVisible = true">2222</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {cancel} from "@/api/loan";
  import {rechargeCoinAddress} from "@/api/recharge";
  import QRCode from 'qrcode';
  import {Message} from 'element-ui';

  export default {
    name: "LoanPledge",
    filters: {
      toLowerCase(str) {
        return str.toLowerCase()
      }
    },
    data() {
      return {
        order: this.$route.query.order,
        loanId: this.$route.query.loanId,
        dialogVisible: false,
        userAddress: ''
      }
    },
    mounted() {
      QRCode.toCanvas(this.order.address, { errorCorrectionLevel: 'H' }, function (err, canvas) {
        if (err) throw err
        var qrCodeImg = document.getElementById('qrCodeImg')
        qrCodeImg.appendChild(canvas)
      })
    },
    methods: {
      cancelOrder() {
        cancel(this.loanId).then(res => {
          Message({
            message: '已取消订单',
            type: 'warning'
          })
          this.$router.push({path: '/loan/pledge/make', query: {loanId: this.loanId}})
        })
      },
      copySuccess() {
        Message({
          message: '已复制',
          type: 'success'
        })
      },
      confirmLoan(){
        this.dialogVisible = false
        rechargeCoinAddress({coinAddress:this.userAddress,loanId:this.loanId}).then(res =>{

        })
      },
      handleClose(done) {
        done()
      }
    }
  }
</script>

<style scoped>
  input:focus{
    outline: none;
  }
  button {
    cursor: pointer;
    border: none;
  }

  .loanPledge {
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    margin: 30px 0 100px 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    border: 1px solid #EAEAEA;
  }

  header > h3 {
    color: #000000;
    font-size: 18px;
    margin-left: 41px;
  }

  header > div {
    color: #999999;
    margin-right: 30px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main > .warning {
    background: #FFFBE7;
    height: 52px;
    border: 1px solid #FEE390;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    width: 1142px;
  }

  main > .warning > img {
    margin: 0 20px 0 10px;
  }

  main > .coin {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 60px;
  }

  main > .coin > h2 {
    font-size: 24px;
    font-weight: bold;
    color: #FF8A14;
    margin-left: 25px;

  }

  #qrCodeImg {
    margin-top: 30px;
  }

  main > .address {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

  main > .address > h2 {
    font-size: 20px;
    margin-right: 55px;
  }

  main > .address > button {
    width: 83px;
    height: 40px;
    background: #FF6056;
    color: #F7F7F7;
    border-radius: 5px;
  }

  main > button:nth-of-type(1) {
    width: 450px;
    height: 60px;
    border-radius: 3px;
    background: #FF8A14;
    font-size: 18px;
    color: #ffffff;
    margin-top: 72px;
  }

  main > button:nth-of-type(2) {
    margin: 40px 0 44px 0;
    color: #999999;
    background: #ffffff;
  }
</style>

<style>
  #qrCodeImg > canvas {
    width: 200px !important;
    height: 200px !important;
  }

  .loanPledge .el-dialog {
    border-radius: 5px;
  }

  .loanPledge .el-dialog__header {
    padding: 0;
    height: 10px;
  }

  .loanPledge .el-dialog__close.el-icon.el-icon-close {
    font-size: 26px;
    font-weight: bold;
    margin: -6px -5px 0 0;
  }

  .loanPledge .el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loanPledge .el-dialog__body > p {
    margin-top: 20px;
    font-size: 20px;
    color: #FF8A14;
    line-height: 20px;
  }

  .loanPledge .el-dialog__body > .coinAddress{
    width: 414px;
    border-bottom: 1px solid #EAEAEA;
    margin-top: 55px;
  }
  .loanPledge .el-dialog__body > .coinAddress >input{
    border: none;
    margin: 10px 0;
    font-size: 16px;
    width: 100%;
  }
  .loanPledge .el-dialog__body > .warning{
    width: 416px;
    font-size: 12px;
    line-height: 24px;
    color: #999999;
    margin-top: 20px;
  }

  .loanPledge .el-dialog__footer{
    display: flex;
    justify-content: center;
  }

  .loanPledge .el-dialog__footer button{
    width: 414px;
    height: 60px;
    font-size: 18px;
    margin-bottom: 34px;
    border-radius: 3px;
    color: #FFFFFF;
  }

</style>
