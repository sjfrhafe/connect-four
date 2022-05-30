<template>
  <div class="home">
    <h1>Hi {{$store.getters.me.name}} 👋</h1>
    <b-button>New Game</b-button>
    <b-button>Join Game</b-button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }, 
  mounted(){
    this.$store.dispatch('fetchMe')
  }
}
</script>
