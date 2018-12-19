<template>
  <div class="asset">
    <div class="container">
      <nav>
        <div class="assetPage" :class="{assetPageSelect:1}">资产</div>
        <div class="financialRecord">
          <!--财务记录-->
        </div>
        <div></div>
      </nav>
      <div class="totalAsset">
        总资产估值(CNY)≈<span style="color: #FF8A14">{{userInfo.summary}}</span>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" @row-click="rowClick">
        <el-table-column prop="code" label="类型" width="140">
        </el-table-column>
        <el-table-column prop="quantityAvailable" label="可用">
        </el-table-column>
        <el-table-column prop="quantityLocked" label="冻结">
        </el-table-column>
        <el-table-column prop="total" label="总额(CNY)">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.stop="chargeB(scope.row)" type="text" size="medium "><span>详情</span></el-button>
            <el-button type="primary" size="mini" @click.stop="extract(scope.row)"
                       :disabled=" + scope.row.quantityAvailable === 0" v-if="scope.row.id">提币
            </el-button>
            <el-button type="primary" size="mini" @click.stop="extract(scope.row)"
                       :disabled=" + scope.row.quantityAvailable === 0" v-else>提现
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {walletInfo} from "@/api/wallet"
  import {rechargeCoin, rechargeMoney, rechargeMoneyDetail, rechargeCoinDetail} from "@/api/recharge";
  import {mapGetters} from 'vuex'
  import {Message} from 'element-ui'

  export default {
    name: "Asset",
    data() {
      return {
        userInfo: '',
        tableData: [],
      }
    },
    computed: {
      ...mapGetters(['token']),

    },
    beforeMount() {
      if (this.token) {
        this.getWalletInfo()
      }
      else {
        Message('请登录')
        this.$router.push('/auth/login')
      }
    },
    methods: {
      getWalletInfo() {
        this.$store.commit('setLoading', true)
        walletInfo().then(res => {
          this.$store.commit('setLoading', false)
          this.userInfo = res

          var data = {
            code: 'CNY',
            quantityAvailable: res.balanceAvailable,
            quantityLocked: res.balanceLocked,
            total: res.balance
          }
          this.tableData.push(data)
          for (var i = 0; i < res.coins.length; i++) {
            this.tableData.push(res.coins[i])
          }
        })
      },
      chargeB(index) {
        if (index.id) {
          rechargeCoinDetail({coinId: index.id}).then(res => {

            this.$router.push({path: '/asset/record', query: {coinInfo: res, coinId: index.id}})
          })
        } else {
          rechargeMoneyDetail().then(res => {

            this.$router.push({path: '/asset/balance', query: {balanceInfo: res}})
          })
        }
      },
      extract(index) {
        if (index.id) {
          rechargeCoin({coinId: index.id}).then(res => {

            this.$router.push({
              path: '/asset/withdrawCoin',
              query: {coinInfo: res, coinId: index.id, coinCode: index.code}
            })
          })
        } else {
          rechargeMoney().then(res => {

            this.$router.push({
              path: '/asset/withdrawMoney',
              query: {balanceInfo: res}
            })
          })
        }
      },
      rowClick(index) {
        if (index.id) {
          rechargeCoinDetail({coinId: index.id}).then(res => {

            this.$router.push({path: '/asset/record', query: {coinInfo: res, coinId: index.id}})
          })
        } else {
          rechargeMoneyDetail().then(res => {

            this.$router.push({path: '/asset/balance', query: {balanceInfo: res}})
          })
        }
      }
    }
  }
</script>

<style scoped>
  .asset {
    background: #F5F6FA;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    overflow: auto;
    border-bottom: 1px solid #EBEBEB;
    margin-bottom: 96px;
  }

  .container > nav {
    display: flex;
    margin: 30px 0 20px 0;
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
    /*cursor: pointer;*/
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

  .totalAsset {
    height: 78px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    background: #ffffff;
    line-height: 78px;
    padding-left: 20px;
    border: 1px solid #ebebeb;
  }

  .container button {

  }

</style>
<style>

</style>
