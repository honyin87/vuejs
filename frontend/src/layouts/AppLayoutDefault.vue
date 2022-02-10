<template>
 <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <Header/>
  <Sidebar/>
  <!-- <div class="app-default-layout">
    <slot />
  </div> -->
  <main id="main" class="main">
    <Notification/>
    <slot/>

  </main><!-- End #main -->
  <Footer/>
</template>

<script>
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Notification from '../components/Notification'
export default {
  name: 'AppLayoutDefault',
  components: {
    Footer,
    Header,
    Sidebar,
    Notification
  }
}
</script>