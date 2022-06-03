<template>
  <div class='navigation'>
      <router-link to='/'>Vier Gewinnt</router-link>
      <router-link to='/impressum'>Impressum und Datenschutz</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.navigation{
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #111;
  width: 100vw;
  padding: 10px 20px;
  text-align: right;
}
</style>