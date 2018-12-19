<template>
  <div class="loanRecord">
    <div class="container" v-show="$route.path === '/loan/record'">
      <nav>
        <div class="borrow" :class="{borrowPageSelect:0}" @click="goBorrow">
          借款
        </div>
        <div class="borrowRecord" :class="{borrowRecordSelect:1}">借款记录</div>
        <div></div>
      </nav>
      <section class="recordList">
        <div class="listHead">
          <h3>借款记录</h3>
        </div>
        <el-table :data="showTableData" stripe style="width: 100%"  :row-class-name="tableRowClassName" size="medium">
          <el-table-column prop="shouldRepaymentDate" label="还款时间"  width="150">
          </el-table-column>
          <el-table-column prop="total" label="金额（元）" style="color: red;" >
          </el-table-column>
          <el-table-column prop="days" label="天数" width="150">
          </el-table-column>
          <el-table-column prop="coinQuantity" label="质押资产" width="240">
          </el-table-column>
          <el-table-column prop="coinCode" label="币种" width="150">
          </el-table-column>
          <el-table-column prop="statusText" label="状态" width="150">
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button @click="chargeB(scope.row)" type="text" size="medium "><span>详情</span></el-button>
            </template>
          </el-table-column>
          <template slot="empty">
            <div class="blank">
              <img src="@/assets/loan/default_pic_record.png">
              <h5>暂无借款记录，去借一笔</h5>
            </div>
          </template>
        </el-table>
        <div class="pagination-wrapper">
          <el-pagination background layout="prev, pager, next" :total="tableData.length" @current-change=changePage
                         :pager-count="5" :page-size="10" :current-page=currentPage>
          </el-pagination>
        </div>
      </section>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getLoanInfo, getList, confirmLoanInfo, getLoanDetail, getAddress} from "@/api/loan";

  export default {
    name: "LoanRecord",
    filters: {},
    data() {
      return {
        loanList: '',
        tableData: [],
        loanId: '',
        loanDetail: '',
        currentPage: 1,
        showTableData: []
      }
    },
    watch: {
      // 暂时不需要
      // '$route'(to, from) {
      //   if (from.name === "借款详情") {
      //     this.getList()
      //   }
      // },

    },
    mounted() {
      this.getList()
    },
    methods: {
      goBorrow() {
        this.$router.push('/loan')
      },
      getList() {
        if (!this.loanList.sortWeight) {
          this.$store.commit('setLoading', true)
          getList().then(res => {
            this.$store.commit('setLoading', false)
            this.loanList = res
            for (var i = 0; i < res.items.length; i++) {
              this.tableData.push(res.items[i])
              if (this.tableData[i].shouldRepaymentDate === '') {
                this.tableData[i].shouldRepaymentDate = '--'
              }
            }
            this.showTableData = this.tableData.slice(0, 10)
            if (this.tableData.length < res.total) {
              this.getLoanRecord(res)
            }
          })
        }

      },
      // 回调请求页面
      getLoanRecord(res) {
        if (res.sortWeight && this.tableData.length < res.total) {
          getList({sortWeight: res.sortWeight}).then(res => {
            for (var i = 0; i < res.items.length; i++) {
              this.tableData.push(res.items[i])
            }
            for (var j = 0; j < this.tableData.length; j++) {
              if (this.tableData[i].shouldRepaymentDate === '') {
                this.tableData[i].shouldRepaymentDate = '--'
              }
            }
            this.getLoanRecord(res)
          })
        }
      },
      chargeB(index) {

        if (index.status === 1 && index.rechargeCoinStatus !== 1) {
          getAddress(index.id).then(res => {
            this.$router.push({path: '/loan/pledge', query: {order: res, loanId: index.id}})
          })
        }
        else if (index.status === 2 || index.rechargeCoinStatus === 1 || index.status === 9
          || index.status === 8 || index.status === 6) {
          this.$router.push({path: '/loan/pledge/make', query: {loanId: index.id}})
        }
        else {
          getLoanDetail(index.id).then(res => {
            this.loanDetail = res
            this.$router.push({path: '/loan/record/detail', query: {loanDetail: this.loanDetail, loanId: index.id}})
          })
        }
      },
      changePage(index) {
        this.currentPage = index
        this.showTableData = this.tableData.slice((index - 1) * 10, index * 10)
      },
      //列表状态样式
      tableRowClassName({row, rowIndex}) {

        if (row.status === 5 || row.status === 8 || row.status === 6) {
          return 'warning-row';
        }
        if (row.isWarning && row.status === 3) {
          return 'warning-row';
        }
        return '';
      }
    }
  }
</script>

<style scoped>
  h3 {
    font-weight: bold;
    font-size: 18px;
  }

  .loanRecord {
    background: #F5F6FA;
  }

  .container {
    margin-bottom: 80px;
    overflow: auto;
  }

  .container > nav {
    display: flex;
    margin: 30px 0 0 0;
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
    cursor: pointer;
  }

  .borrowPageSelect {
    border-top: 3px solid #FF8A14;
    border-right: 1px solid #ebebeb;
    border-bottom: none !important;
    color: #FF8A14 !important;
    font-weight: bold;
  }

  .borrowRecordSelect {
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

  .listHead {
    border-bottom: 1px solid #EAEAEA;
    height: 78px;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .container > .recordList {
    border: 1px solid #EBEBEB;
    background: #ffffff;
    margin-top: 20px;
  }

  .blank {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 76px;
    margin-bottom: 65px;
  }

  .blank > h5 {
    color: #999999;
    margin-top: 20px;
    font-size: 14px;
    line-height: 14px;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
  .el-table{
    min-height: 617px;
  }

</style>

<style>
  .el-table .warning-row {
    background: #FFFAF9;
    color: #FF6056;
  }
</style>
