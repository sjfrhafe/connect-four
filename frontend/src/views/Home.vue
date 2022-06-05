<template>
  <div class="home">
    <background />
      <contrast>

        <h1>Ahoi!</h1>
        <p>Welcome to games@simplyfred, maybe the best place to play connect-four. </p>
        <p>This sideproject is still in progress. so if you find a bug, feel free to report it on my github page.</p>
        <p>Since the login is not implemented yet, the sorting head has decided that you should be called <span class="name">{{$store.getters.me.name}}</span> for this session. </p>
        <router-link to='/getstarted'>Let's go</router-link>
      </contrast>
  </div>
</template>

<script>
import Background from '@/components/Background.vue'
import Contrast from '@/components/Contrast.vue'

export default {
  name: 'Home',
  components: {
    Background, 
    Contrast
  }, 
  mounted(){
    this.$store.dispatch('fetchMe')
  }
}
</script>

<style scoped>

</style>
