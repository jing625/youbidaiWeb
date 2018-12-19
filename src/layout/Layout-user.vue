<template>
  <div class="wrapper">
    <Header class="header"></Header>
    <div class="user-wrapper">
      <div class="user">
        <div class="topBar">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
              <span v-if="index===levelList.length-1">{{item.name}}</span>
              <router-link v-else :to="item.path">{{item.name}}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content">
          <div class="sidebar">
            <ul>
              <li v-for="side in sidebar" :class="{highlight: side.path.substr(0,12) === currentRoute.substr(0,12)}">
                <router-link :to="side.path">
                  {{side.name}}
                </router-link>
              </li>
            </ul>
          </div>
          <Main class="main"></Main>
        </div>
      </div>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  import Main from '../components/Main'

  export default {
    name: "Layout",
    data() {
      return {
        sidebar: [{name: '账号安全', path: '/user/security'}, {name: '邀请好友', path: '/user/invite'}
        // , {name: '联系客服', path: '/xxxxx'}
        ],
        currentRoute: this.$route.path,
        levelList: ''
      }
    },
    components: {
      Header,
      Main,
      Footer
    },
    watch: {
      $route() {
        // this.getBreadcrumb()
        location.reload()
      }
    },
    created() {
      this.getBreadcrumb()

    },
    computed: {},
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)

        this.levelList = matched
      },
      selectedTab(){

      }
    }
  }
</script>

<style scoped>

  .user-wrapper {
    background: #F5F6FA;
    overflow: hidden;
    /*box-shadow: inset 0px 3px 10px 0px rgba(0, 0, 0, 0.1);*/
    /*flex-grow: 1;*/
  }

  .user {
    width: 1200px;
    margin: 0 auto;
  }

  .topBar {
    margin-top: 21px;

  }

  .sidebar > ul {
    border: 1px solid rgba(235, 235, 235, 1);
    display: inline-block;
  }

  .sidebar > ul > li {
    width: 180px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;

  }

  .highlight {
    background: #fefefe !important;
    border-left: 4px solid #FF8A14 !important;
  }

  .content {
    margin-top: 29px;
    display: flex;
    flex-direction: row;
  }

  .main {
    width: 990px;
    margin-left: 30px;
    margin-bottom: 90px;
    min-height: 720px;
  }


</style>
