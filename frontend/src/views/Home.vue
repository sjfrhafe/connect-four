<template>
  <div class="home">
    <background />
      <div class="contrast">

        <h1>Ahoi!</h1>
        <p>Welcome to games@simplyfred, maybe the best place to play connect-four. </p>
        <p>This sideproject is still in progress. so if you find a bug, feel free to report it on my github page.</p>
        <p>Since the login is not implemented yet, the sorting head has decided that you should be called <span class="name">{{$store.getters.me.name}}</span> for this session. </p>
        <!-- <b-button bock @click='createGame'>New Game</b-button>
        <hr>
        <b-input v-model="key" class='mb-2'></b-input>
        <b-button block @click="joinGame(key)">Join Game</b-button> -->
      </div>
  </div>
</template>

<script>
import Background from '@/components/Background.vue'

export default {
  name: 'Home',
  data: () => ({
    key: ''
  }), 
  components: {
    Background
  }, 
  methods: {
    createGame(){
      fetch('/api/game/create')
        .then(data => data.text())
        .then(this.joinGame)
    }, 
    joinGame(key){
      fetch('/api/game/join/' + key)
        .then(data => data.text())
        .then(this.navigateToGame)
    }, 
    navigateToGame(joinToken){
      this.$router.push({name: 'Play', params: {joinToken}})
    }
  }, 
  mounted(){
    this.$store.dispatch('fetchMe')
  }
}
</script>

<style scoped>
.home{
  display: inline-block;
  width: 100%;
  max-width: 800pt;
  color: white;
  text-align: left;
  padding: 20vh 60px;
}

.home .contrast{
  padding: 20pt;
  background-color: rgba(4, 4, 4, 0.837);
  border-radius: 4pt;
}

.home .contrast h1{
  font-weight: bold;
  font-size: 6em;
}

.home .contrast p{
  font-size: 1.2em;
}

.home .contrast p .name{
  color: rgb(239, 84, 151);
}
</style>
