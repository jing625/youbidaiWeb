<template>
  <div class="loanBail">
    <div class="warning">
      <img src="@/assets/loan/icon_hint.png">
      <span>转账提醒： 1、打款请务必填上备注信息 2、完成转账动作后，请务必点击下方【已转账】按钮如因本人操作不当导致平台没收到款，平台概不负责</span>
    </div>
    <header>
      <h2>保证金：{{bailInfo.bail}}元</h2>
    </header>
    <main>
      <h2>请还款到以下账户</h2>
      <table>
        <tr>
          <td>
            <div>开户名：<span>{{bailInfo.bankCardPayee}}</span></div>
            <button v-clipboard="bailInfo.bankCardPayee" @success="copySuccess">复制</button>
          </td>
          <td>
            <div>银行账户：<span>{{bailInfo.bankCardNumber}}</span></div>
            <button v-clipboard="bailInfo.bankCardNumber" @success="copySuccess">复制</button>
          </td>
          <td>
            <div>开户银行：<span>{{bailInfo.bankName}}</span></div>
            <button v-clipboard="bailInfo.bankName" @success="copySuccess">复制</button>
          </td>
        </tr>
        <tr>
          <td>
            <div>打款备注：<span>{{bailInfo.transferRemark}}</span></div>
            <button v-clipboard="bailInfo.transferRemark" @success="copySuccess">复制</button>
          </td>
          <td>
            <div>开户支行：<span>{{bailInfo.bankCardProvider}}</span></div>
            <button v-clipboard="bailInfo.bankCardProvider" @success="copySuccess">复制</button>
          </td>
          <td></td>
        </tr>
      </table>
      <button @click="transferSuccess">已转账</button>
    </main>
  </div>
</template>

<script>
  import {Message} from 'element-ui';
  import {rechargeBail} from "@/api/recharge";
  import {getLoanDetail,bailInfo} from "@/api/loan";

  export default {
    name: "LoanBail",
    data() {
      return {
        bailInfo: this.$route.query.bailInfo,
        loanId: this.$route.query.loanId,
        loanDetail: ''
      }
    },
    mounted(){
      if (!this.bailInfo.bankCardPayee){
        this.getBailInfo()
      }
    },
    methods: {
      copySuccess() {
        Message({
          message: '已复制',
          type: 'success'
        })
      },
      getBailInfo(){
        bailInfo(this.loanId).then(res =>{
          this.bailInfo = res
        })
      },
      transferSuccess() {
        this.$confirm('确定已经通过银行卡转账？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          rechargeBail({money:this.bailInfo.bail,loanId: this.loanId}).then((res) => {
            Message({
              message: res.message,
              type: 'success'
            })
            getLoanDetail(this.loanId).then(res => {
              this.loanDetail = res

              this.$router.push({path: '/loan/record/detail', query: {loanDetail: this.loanDetail,loanId:this.loanId}})
            })
          })
        })
      }
    }
  }
</script>

<style scoped>
  .warning {
    background: #FFFBE7;
    height: 52px;
    border: 1px solid #FEE390;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-top: 30px;
  }

  .warning > img {
    margin: 0 20px 0 10px;
  }

  header {
    border: 1px solid #EBEBEB;
    display: flex;
    align-items: center;
    height: 70px;
    background: #FFFFFF;
    margin-top: 20px;
  }

  header > h2 {
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    margin-left: 30px;
  }

  main {
    border: 1px solid #EBEBEB;
    background: #FFFFFF;
    margin-top: 20px;
  }

  main > h2 {
    font-size: 18px;
    font-weight: bold;
    margin: 30px 0 0 20px;
  }

  main > table {
    margin: 30px auto 0px auto;
    border-collapse: collapse;
    border-spacing: 0;
  }

  main > table tr {
    display: flex;
  }

  main > table tr > td {
    width: 387px;
    height: 70px;
    border: 1px solid #EAEAEA;
    font-size: 14px;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  main > table tr > td > div {
    margin-left: 20px;
  }

  main > table tr > td > div > span {
    color: #333333;
  }

  main > table tr > td > button {
    background: #F7F7F7;
    border-radius: 5px;
    color: #999999;
    font-size: 16px;
    width: 63px;
    height: 30px;
    border: none;
    cursor: pointer;
    margin-right: 20px;
  }

  main > button {
    width: 450px;
    height: 60px;
    border-radius: 3px;
    background: #FF8A14;
    font-size: 18px;
    color: #FFFFFF;
    border: none;
    margin: 50px 0 40px 20px;
    cursor: pointer;
  }
</style>
