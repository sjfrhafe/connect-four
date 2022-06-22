<template>
  <div id="app">
    <alerts />
    <navigation />
    <router-view/>
    <a class='freepik' href="http://www.freepik.com">Avatars designed by catalyststuff / Freepik</a>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Alerts from '@/components/Alerts.vue'

export default {
  components: {
    Navigation,
    Alerts
  }
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.freepik{
  color: white;
}

</style>
