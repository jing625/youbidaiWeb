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
        <Main class="main"></Main>
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
    name: "Layout-asset",
    data() {
      return {
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
        this.getBreadcrumb()
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
      }
    }
  }
</script>

<style scoped>

  .user-wrapper {
    background: #F5F6FA;
    overflow: hidden;
    box-shadow: inset 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .user {
    width: 1200px;
    margin: 0 auto;
  }

  .topBar {
    margin-top: 21px;

  }

  .main {
    min-height: 720px;
  }


</style>
