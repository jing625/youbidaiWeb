<template>
  <div id="app" @click="closeTriangle">
    <router-view v-loading = loading></router-view>
    <div class="scroll">
      <img src="@/assets/index/btn_top.png" alt="" @click="toTop(step)" v-show="isActive">
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'


export default {
  name: 'App',
  props: {
    step: {   //此数据是控制动画快慢的
      type: Number,
      default: 100
    }
  },
  data(){
    return{
      isActive: false,
    }
  },
  methods: {
    toTop(i) {
      document.documentElement.scrollTop -= i;
      if (document.documentElement.scrollTop > 0) {
        var c = setTimeout(() => this.toTop(i), 16);
      } else {
        clearTimeout(c);
      }
    },
    closeTriangle(){
     // bus.$emit('closeTriangle',false)
    }
  },
  created() {
    var vm = this;
    window.onscroll = function () {
      if (document.documentElement.scrollTop > 600) {
        vm.isActive = true;
      } else {
        vm.isActive = false;
      }
    }
  },
  computed:{
    ...mapGetters(['loading'])

  }
}
</script>


<style>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body{
    /*margin: 10px;*/
  }
  a{
    text-decoration:none;
    color:#333;
  }
  h1, h2, h3, h4, h5, h6{font-weight:normal;}
  ul,ol {
    list-style: none;
  }
  button:focus {
    outline: none;
  }
  .scroll {
    position: fixed;
    right: 10px;
    bottom: 160px;
    cursor: pointer;
  }

  /*topNavBar*/
  .el-tabs__nav-wrap::after{
    background-color: #ffffff!important;
  }

  /*验证码滑块*/
  .nc-container .nc_scale span{
    height: 34px!important;
  }
  .nc_scale{
    width: 323.9px!important;
  }

  /*el-table*/
  .el-button--medium > span > span {
    display: inline-block;
    padding: 4px 6px;
    margin-left: -8px;
  }

  .el-button--medium > span > span:hover {
    background: #FF8A14;
    color: #FFFFFF;
    border-radius: 3px;
  }

  .el-table td {
    padding: 8px 0;
  }

  .el-table .cell{
    padding-left: 50px;
  }

  .el-button--primary.is-disabled, .el-button--primary.is-disabled:hover, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:active{
    background-color: #999999;
    border-color: #999999;
  }
</style>
