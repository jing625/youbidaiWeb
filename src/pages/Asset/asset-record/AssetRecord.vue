<template>
  <div class="assetRecord">
    <div class="container">
      <nav>
        <div class="assetPage" @click="goAsset">
          资产
        </div>
        <div class="financialRecord" :class="{financialRecordSelect:1}">财务记录</div>
        <div></div>
      </nav>
      <header>
        <div class="title">
          <h2>总资产：{{coinInfo.coinQuantity}} {{coinInfo.coinCode}}</h2>
        </div>
        <div class="items">
          <div>
            <h1>{{coinInfo.summary}}元</h1>
            <h3>估值</h3>
          </div>
          <div>
            <h1>{{coinInfo.coinQuantityAvailable}}</h1>
            <h3>可用</h3>
          </div>
          <div>
            <h1>
              {{coinInfo.coinQuantityLocked}}
            </h1>
            <h3>冻结</h3>
          </div>
        </div>
        <el-table :data="showTableData" stripe style="width: 100%" height="430" size="medium ">
          <el-table-column prop="finishedAt" label="日期">
          </el-table-column>
          <el-table-column prop="typeText" label="类型">
          </el-table-column>
          <el-table-column prop="statusText" label="状态">
          </el-table-column>
          <el-table-column prop="coinQuantity" label="总额">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
          <el-pagination background layout="prev, pager, next" :total="tableData.length" @current-change=changePage
                         :pager-count="5"
                         :page-size="10" :current-page=currentPage>
          </el-pagination>
        </div>
        <el-button type="primary" @click="goWithdrawCoin" :disabled="isGrey">提币</el-button>
      </header>
    </div>
  </div>
</template>

<script>
  import {rechargeCoin, rechargeMoney, rechargeMoneyDetail, rechargeCoinDetail} from "@/api/recharge";

  export default {
    name: "AssetRecord",
    data() {
      return {
        coinInfo: this.$route.query.coinInfo,
        coinId: this.$route.query.coinId,
        tableData: [],
        showTableData: [],
        currentPage: 1,
      }
    },
    mounted() {
      this.getCoinInfo()
    },
    computed: {
      isGrey() {
        return this.coinInfo.coinQuantityAvailable === '0.00000000';
      }
    },
    methods: {
      goAsset() {
        this.$router.push('/asset')
      },
      goWithdrawCoin() {
        rechargeCoin({coinId: this.coinId}).then(res => {

          this.$router.push({
            path: '/asset/withdrawCoin',
            query: {coinInfo: res, coinId: this.coinId, coinCode: this.coinInfo.coinCode}
          })
        })
      },
      getCoinInfo() {
        if (!this.tableData.finishedAt) {
          this.$store.commit('setLoading', true)
          rechargeCoinDetail({coinId: this.coinId}).then(res => {
            this.$store.commit('setLoading', false)
            this.coinInfo = res
            for (var i = 0; i < this.coinInfo.recharges.length; i++) {
              this.tableData.push(this.coinInfo.recharges[i])
            }
            this.showTableData = this.tableData.slice(0, 10)
            if (this.tableData.length < res.rechargeTotal) {
              this.getPage(res)
            }
          })
        }
      },
      // 回调请求页面
      getPage(res) {
        if (res.sortWeight && this.tableData.length < res.rechargeTotal) {
          rechargeMoneyDetail({sortWeight: res.sortWeight}).then(res => {
            for (var i = 0; i < res.recharges.length; i++) {
              this.tableData.push(res.recharges[i])
            }
            this.getPage(res)
          })
        }
      },
      changePage(index) {
        this.currentPage = index
        this.showTableData = this.tableData.slice((index - 1) * 10, index * 10)
      }
    }
  }
</script>

<style scoped>
  .assetRecord {
    background: #F5F6FA;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    overflow: auto;
    /*border-bottom: 1px solid #EBEBEB;*/
  }

  .container > nav {
    display: flex;
    margin: 30px 0 20px 0;
  }

  .container > nav > div:nth-child(1) {
    cursor: pointer;
  }

  .container > nav > div {
    background: #ffffff;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: #333333;
    height: 63px;
    width: 152px;
    line-height: 63px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ebebeb;
  }

  .assetPageSelect {
    border-top: 3px solid #FF8A14;
    border-right: 1px solid #ebebeb;
    border-bottom: none !important;
    color: #FF8A14 !important;
    font-weight: bold;
  }

  .financialRecordSelect {
    border-top: 3px solid #FF8A14;
    border-right: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    border-bottom: none !important;
    color: #FF8A14 !important;
    font-weight: bold;
  }

  .container > nav > div:nth-child(3) {
    flex-grow: 1;
    cursor: auto;
  }

  header {
    border: 1px solid #EBEBEB;
    align-items: center;
    background: #FFFFFF;
    margin-top: 20px;
    margin-bottom: 90px;
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
    border-bottom: 1px solid #EAEAEA;
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

  header > button {
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

  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
  .el-table{
    min-height: 629px;
  }
</style>
<style>
  .assetRecord header .el-table td {
    padding: 18px 0;
  }
</style>
