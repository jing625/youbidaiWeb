<template>
  <div class="makeLoan">
    <header>
      <h2>放款进度</h2>
    </header>
    <main>
      <div class="step" :style="'height:'+ stepHeight + 'px'">
        <el-steps direction="vertical" :active="1">
          <el-step v-for="items in stepData" :title="items.title" :description="items.content" :key="items.id">
            <i class="stepImg" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
      <div class="date" :style="'height:'+ stepHeight + 'px'">
        <div v-for="items in stepData" :key="items.id">
          {{items.time}}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import {getLoanDetail} from "@/api/loan";

  export default {
    name: "MakeLoan",
    data() {
      return {
        loanId: this.$route.query.loanId,
        stepData:''
      }
    },
    computed:{
      stepHeight(){
        return this.stepData.length * 100
      },
    },
    mounted() {
      this.getLoanDetailInfo()
    },
    methods: {
      getLoanDetailInfo() {
        getLoanDetail(this.loanId).then(res => {

          this.stepData = res.remarks
        })
      }
    }
  }
</script>

<style scoped>
  .makeLoan{
    min-height: 600px;
  }
  .stepImg{
    background-image: url("../../../assets/loan/borrow_pic_circle_orange.png");
    margin-top: 10px;
  }
  header {
    border-bottom: 1px solid #EAEAEA;
  }

  header > h2 {
    font-size: 18px;
    color: #000000;
    line-height: 18px;
    margin: 22px 40px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > .step {
    margin: 40px 0 60px 70px;
  }

  main > .date {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 48px 70px 0 0;
    font-size: 16px;

  }

  main > .date > div {
    color: #999999;
  }
</style>
<style>
  .el-step__title{
    font-weight: bold;
    font-size: 18px;
  }
  .el-step__description{
    font-size: 16px;
    margin-top: 10px;
  }
  .el-step__icon{
    width: 22px;
    height: 22px;

  }
  .el-step.is-vertical .el-step__line{
    top: 3px;
  }
  .el-step__description.is-process,.el-step__description.is-finish {
    color: #999999;
  }
  .el-step__head.is-process{
    border-color: #999999;
  }
</style>
