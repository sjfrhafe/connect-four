<template>
  <div class='navigation'>
      <router-link to='/'>Home</router-link>
      <router-link to='/impressum'>Impressum und Datenschutz</router-link>
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