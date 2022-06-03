<template>
  <div class="background">
      <div class="large"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.background, .large{
    height: 100vh;
    width: 100vw;
    background-color: gray;
}

.background{
    position: fixed;
    top: 0; 
    left: 0;
    z-index: -1;
}

.large{
    background-size: cover;
    background-image: url('~@/assets/game.jpg');
}
</style>