<template>
  <div class="play">
      <side-bar />

      <ul>
          <li v-for='player in $store.getters.gameState.playerlist' :key="player.id">{{player}}</li>
      </ul>

        <div style='color: red;'>
            {{$store.getters.key}}
        </div>
      <b-button @click='addOne'>Count++ {{$store.getters.gameState.counter || ''}}</b-button>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
    data: () => ({
        joinToken: null, 
        socket: null
    }), 
    created(){
        this.$store.commit('setJoinToken', this.$route.params.joinToken)

        this.$store.dispatch('connectWs')
    }, 
    methods: {
        addOne(){
            this.emit('add-one')
        }, 
        emit(method, params){
            this.$store.dispatch('emit', {method, params})
        }
    }, 
    components: {
        SideBar
    }
}
</script>

<style>
.play{
    padding: 20px;
    display: inline-block;
    max-width: 400pt;
}
</style>