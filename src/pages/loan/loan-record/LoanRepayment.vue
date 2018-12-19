<template>
  <div class="loanRepayment">
    <div class="warning">
      <img src="@/assets/loan/icon_hint.png">
      <span>转账提醒： 1、打款请务必填上备注信息 2、完成转账动作后，请务必点击下方【已转账】按钮如因本人操作不当导致平台没收到款，平台概不负责</span>
    </div>
    <header>
      <div class="title">
        <h2>合计还款：{{repayInfo.summary}}元</h2>
      </div>
      <div class="items">
        <div>
          <h1>{{repayInfo.total}}元</h1>
          <h3>还款本金</h3>
        </div>
        <div>
          <h1>{{repayInfo.overdueFine | blank}}元</h1>
          <h3>滞纳金</h3>
        </div>
        <div>
          <h1>
            {{repayInfo.coinQuantity}}
            {{repayInfo.coinCode}}
          </h1>
          <h3>赎回</h3>
        </div>
      </div>
    </header>
    <main>
      <h2>请还款到以下账户</h2>
      <table>
        <tr>
          <td>
            <div>开户名：<span>{{repayInfo.bankCardPayee}}</span></div>
            <button v-clipboard="repayInfo.bankCardPayee" @success="copySuccess">复制</button>
          </td>
          <td>
            <div>银行账户：<span>{{repayInfo.bankCardNumber}}</span></div>
            <button v-clipboard="repayInfo.bankCardNumber" @success="copySuccess">复制</button>
          </td>
          <td>
            <div>开户银行：<span>{{repayInfo.bankName}}</span></div>
            <button v-clipboard="repayInfo.bankName" @success="copySuccess">复制</button>
          </td>
        </tr>
        <tr>
          <td>
            <div>打款备注：<span>{{repayInfo.transferRemark}}</span></div>
            <button v-clipboard="repayInfo.transferRemark" @success="copySuccess">复制</button>
          </td>
          <td>
            <div>开户支行：<span>{{repayInfo.bankCardProvider}}</span></div>
            <button v-clipboard="repayInfo.bankCardProvider" @success="copySuccess">复制</button>
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
  import {getLoanDetail, repayInfo, repayment} from "@/api/loan";


  export default {
    name: "LoanRepayment",
    data() {
      return {
        repayInfo: this.$route.query.repayInfo,
        loanId: this.$route.query.loanId,
        loanDetail: ''
      }
    },
    filters: {
      blank(str) {
        return str || '--'
      }
    },
    mounted() {
      if (!this.repayInfo.bankCardPayee) {
        this.getRepayInfo()
      }
    },
    methods: {
      copySuccess() {
        Message({
          message: '已复制',
          type: 'success'
        })
      },
      getRepayInfo() {
        repayInfo(this.loanId).then(res => {
          this.repayInfo = res
        })
      },
      transferSuccess() {
        this.$confirm('确定已经通过银行卡转账？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          repayment(this.loanId).then((res) => {
            Message({
              message: res.message,
              type: 'success'
            })
            this.$router.push({path: '/loan/record/detail', query: {loanDetail: this.loanDetail, loanId: this.loanId}})
          })
        })
      }
    }

  }
</script>

<style scoped>
  .loanRepayment {
    margin-bottom: 90px;
  }

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
    align-items: center;
    background: #FFFFFF;
    margin-top: 20px;
  }

  header > .title {
    border-bottom: 1px solid #EAEAEA;
  }

  header > .title > h2 {
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    margin: 26px 30px;
    line-height: 18px;
  }

  header > .items {
    display: flex;
    height: 124px;
    align-items: center;
  }

  header > .items > div {
    width: 400px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  header > .items > div:not(:nth-child(3)) {
    border-right: 1px solid #EAEAEA;
  }

  header > .items > div > h1 {
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
  }

  header > .items > div > h3 {
    color: #999999;
    line-height: 16px;
    font-size: 16px;
    margin-top: 12px;
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
