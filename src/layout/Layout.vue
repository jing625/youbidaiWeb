<template>
  <div class="wrapper">
    <Header class="header"></Header>
    <Main class="main"></Main>
    <Footer class="footer"></Footer>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  import Main from '../components/Main'

  export default {
    name: "Layout",
    components: {
      Header,
      Main,
      Footer
    }
  }
</script>

<style scoped>


  .wrapper {
    display: flex;
    flex-direction: column;
    /*height: 100vh;*/
  }
  .main {
    /*flex-grow: 1;*/
    min-height: 720px;
  }


</style>
