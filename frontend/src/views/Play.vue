<template>
  <div class="play">
      <side-bar />
      <connect-four />
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import ConnectFour from '@/components/games/ConnectFour.vue'
export default {
    
    created(){
        this.$store.commit('setJoinToken', this.$route.params.joinToken)
        this.$store.dispatch('connectWs')
    }, 
    components: {
        SideBar, 
        ConnectFour
    }
}
</script>

<style>
.play{
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
}

</style>