<template>
  <div class="home">
    <h1>Hi {{$store.getters.me.name}} 👋</h1>
    <b-button @click='createGame'>New Game</b-button>
    <b-button @click="joinGame">Join Game</b-button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
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
    navigateToGame(key){
      this.$router.push({name: 'Play', params: {key}})
    }
  }, 
  mounted(){
    this.$store.dispatch('fetchMe')
  }
}
</script>
