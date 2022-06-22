<template>
  <div class='navigation'>
      <router-link to='/'>Home</router-link>
      <a href="https://simplyfred.de/#/impressum">Impressum</a>
      <a href="https://simplyfred.de/#/datenschutz">Datenschutz</a>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.navigation{
  display: flex;
  gap: 6pt;
  background-color: #111;
  width: 100vw;
  padding: 10px 20px;
  text-align: right;
}

.navigation  *:first-child{
  margin-left: auto;
}
</style>