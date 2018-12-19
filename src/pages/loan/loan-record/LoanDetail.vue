<template>
  <div class="loanDetail">
    <section class="summary">
      <header>
        <!--警戒--> <!--待还款-->
        <div class="items-wrapper"
             v-if="loanDetail.status === 3 || loanDetail.isWarning && loanDetail.status !== 4 && loanDetail.status !==5">
          <h3>警戒线：{{loanDetail.warningTotal}}</h3>
          <h3>平仓线：{{loanDetail.closedTotal}}</h3>
        </div>
        <!--已平仓--><!--已还款-->
        <div class="btn-wrapper" v-if="loanDetail.status === 5 || loanDetail.status === 4">
          <button style="background: #FF8A14" @click="goLoan">再次借款</button>
        </div>
        <div class="btn-wrapper" v-else>
          <!--警戒-->
          <button v-if="loanDetail.isWarning&&loanDetail.bailRechargeStatus !== 1 && loanDetail.repaymentStatus !== 2"
                  @click="goBail">补保证金
          </button>
          <!--警戒--><!--待还款-->
          <button :class="{btnGray:loanDetail.bailRechargeStatus === 1 || loanDetail.repaymentStatus === 2}"
                  :disabled="loanDetail.bailRechargeStatus === 1 || loanDetail.repaymentStatus === 2"
                  v-if="loanDetail.status === 3 || loanDetail.isWarning" @click="goRepay">还款赎回
          </button>
        </div>

      </header>
      <!--警戒--> <!--待还款-->
      <main v-if="loanDetail.status === 3">
        <div>
          <h2>{{loanDetail.shouldRepaymentDate}}</h2>
          <h4>还款日期</h4>
        </div>
        <div>
          <h2>{{loanDetail.coinCode}}</h2>
          <h4>抵押物</h4>
        </div>
        <div>
          <h2>{{loanDetail.repaymentTotal}}元</h2>
          <h4>待还金额</h4>
        </div>
        <div>
          <h2 :class="{redFont: loanDetail.isWarning}">{{loanDetail.coinCurrentTotal}}元</h2>
          <h4>抵押物价值</h4>
        </div>
        <img src="@/assets/loan/pic_guard.png" v-if="loanDetail.isWarning && loanDetail.status === 3 &&loanDetail.repaymentStatus !== 2">
      </main>
      <!--已平仓-->
      <main v-if="loanDetail.status === 5">
        <div>
          <h2>{{loanDetail.shouldRepaymentDate}}</h2>
          <h4>还款日期</h4>
        </div>
        <div>
          <h2>{{loanDetail.coinCode}}</h2>
          <h4>抵押物</h4>
        </div>
        <div>
          <h2>{{loanDetail.repaymentTotal}}元</h2>
          <h4>待还金额</h4>
        </div>
        <div>
          <h2>{{loanDetail.closedPrice}}元</h2>
          <h4>平仓价</h4>
        </div>
        <img src="@/assets/loan/pic_closeout.png">
      </main>
      <!--已还款-->
      <main v-if="loanDetail.status === 4" class="repayment">
        <div>
          <h2>{{loanDetail.repaymentTotal}}元</h2>
          <h4>还款金额</h4>
          <h5>{{loanDetail.transferAt}}借入，为期{{loanDetail.daysText}}</h5>
        </div>
      </main>
    </section>
    <section class="detail">
      <h3>
        借款明细
      </h3>
      <table>
        <tr>
          <td>借款单号：<span>{{loanDetail.id | cutStr }}</span></td>
          <td>借款状态：<span
            :class="{redFont: loanDetail.status === 3 ||loanDetail.status === 5}">{{loanDetail.statusText}}</span></td>
          <td>还款状态：
            <span v-if="loanDetail.status === 4 || loanDetail.repaymentStatus ===1">--</span>
            <span v-else>{{loanDetail.repaymentStatusText}}</span>
          </td>
          <td>补保证金状态：
            <span v-if="loanDetail.status === 4 ||loanDetail.bailRechargeStatus === 0">--</span>
            <span v-else :class="{redFont: loanDetail.bailRechargeStatus === 3}">{{loanDetail.bailRechargeStatusText | blank}}</span>
          </td>
        </tr>
        <tr>
          <td>借款金额：<span>{{loanDetail.total | addUnit}}</span></td>
          <td>手续费：<span>{{loanDetail.poundage | addUnit}}</span></td>
          <td>保证金：<span>{{loanDetail.bail | addUnit | blank}}</span></td>
          <td>滞纳金：<span>{{loanDetail.overdueFine | addUnit | blank}}</span></td>
        </tr>
        <tr>
          <td>抵押数字货币：<span>{{loanDetail.coinQuantity}} {{loanDetail.coinCode}}</span></td>
          <td>质押率：<span>{{loanDetail.coinLoanRatio}}</span></td>
          <td>借款期限：<span>{{loanDetail.daysText}}</span></td>
          <td>逾期天数：<span>{{loanDetail.exceedDays | addDay | blank}}</span></td>
        </tr>
        <tr>
          <td>申请借款时间：<span>{{loanDetail.loanDate}}</span></td>
          <td>放款时间：<span>{{loanDetail.transferAt}}</span></td>
          <td>应还款日期：<span>{{loanDetail.shouldRepaymentDate}}</span></td>
          <td v-if="loanDetail.status === 5">实际平仓日期：<span>{{loanDetail.closedAt}}</span></td>
          <td v-else>实际还款日期：<span>{{loanDetail.repaymentAt | blank}}</span></td>
        </tr>
        <tr>
          <td>抵押借款合同：<a :href="loanDetail.contractUrl" target="_blank">查看</a></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
  import {bailInfo, repayInfo, getLoanDetail} from "@/api/loan";

  export default {
    name: "LoanDetail",
    filters: {
      blank(str) {
        if (str === '0元' || str === '0天') {
          return '--'
        }
        return str || '--'
      },
      cutStr(str) {
        return str.substr(0, 6)
      },
      addUnit(str) {
        return str + '元'
      },
      addDay(str) {
        return str + '天'
      }
    },
    data() {
      return {
        loanDetail: this.$route.query.loanDetail,
        loanId: this.$route.query.loanId
      }
    },
    mounted() {
      if (!this.loanDetail.id) {
        this.getLoanDetail()
      }
    },
    methods: {

      goBail() {
        bailInfo(this.loanDetail.id).then(res => {

          this.$router.push({path: '/loan/record/bail', query: {bailInfo: res, loanId: this.loanDetail.id}})
        })
      },
      goRepay() {
        repayInfo(this.loanDetail.id).then(res => {

          this.$router.push({path: '/loan/record/repay', query: {repayInfo: res, loanId: this.loanDetail.id}})
        })
      },
      goLoan() {
        this.$router.push('/loan')
      },
      getLoanDetail() {
        getLoanDetail(this.loanId).then(res => {
          this.loanDetail = res
        })
      }
    },

  }
</script>

<style scoped>
  button {
    height: 40px;
    border-radius: 3px;
    border: none;
    color: #ffffff;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    width: 106px;
    cursor: pointer;
  }

  .summary {
    border: 1px solid #EBEBEB;
    margin-top: 20px;
    background: #ffffff;

  }

  .summary > header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EAEAEA;
    height: 70px;
    justify-content: flex-end;
    position: relative;
  }

  .summary > header > .items-wrapper {
    display: flex;
    position: absolute;
    left: 0px;
  }

  .summary > header > .items-wrapper > h3 {
    font-weight: 500;
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    margin-left: 30px;
  }

  .summary > header > .btn-wrapper {
    display: flex;
  }

  .summary > header > .btn-wrapper > button:nth-child(1) {
    background: #FF6056;
    margin-right: 30px;
  }

  .summary > header > .btn-wrapper > button:nth-child(2) {
    background: #FF8A14;
    margin-right: 20px;
  }

  .summary > main {
    display: flex;
    height: 124px;
    align-items: center;
    position: relative;
  }

  .summary > main > div {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .summary > main > div:not(:nth-child(4)) {
    border-right: 1px solid #EAEAEA;
  }

  .summary > main > div > h2 {
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
    margin-top: -12px;
  }

  .summary > main > div > h4 {
    color: #999999;
    line-height: 16px;
    margin-top: 15px;
  }

  .summary > main > img {
    position: absolute;
    right: 0;
    top: 0;
  }

  .detail {
    background: #ffffff;
    border: 1px solid #EBEBEB;
    margin: 20px 0 90px 0;
  }

  .detail > h3 {
    font-size: 18px;
    line-height: 18px;
    font-weight: bold;
    margin: 30px 20px;
  }

  .detail > table {
    margin: 0 auto 30px auto;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .detail > table tr > td {
    width: 290px;
    height: 70px;
    border: 1px solid #EAEAEA;
    padding-left: 20px;
    font-size: 14px;
    color: #999999;
  }

  .detail > table tr > td > span {
    color: #333333;
  }

  .detail > table tr > td > a {
    /*text-decoration: underline;*/
    border-bottom: 1px solid #FF8A14;
    color: #FF8A14;
  }

  .redFont {
    color: red !important;
  }

  .repayment {
    display: flex;
    justify-content: center;
    height: 144px;
  }

  .summary > .repayment > div {
    border: none !important;
  }

  .summary > .repayment > div > h2 {
    margin-top: 6px;
  }

  .summary > .repayment > div > h5 {
    font-size: 12px;
    color: #999999;
    margin-top: 12px;
  }

  .btnGray {
    background: #bbbbbb !important;
    color: #ffffff !important;
    cursor: not-allowed;
    border-color: #bbbbbb;
  }
</style>
