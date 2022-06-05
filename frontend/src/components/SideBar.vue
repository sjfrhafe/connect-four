<template>
  <div class="sidebar">
      <h2>invite</h2>
      <div class="input-group mb-3">
            <b-input :value='$store.getters.key' size='sm' class='mb-2'/>
            <b-button block variant='primary' size='sm'>Copy Link</b-button>
      </div>
      <hr>
      <h2>players</h2>
      <player-list />
      <div class="input-group mt-auto">
        <b-button varinat='dark' block size='sm'>Report Error</b-button>
        <b-button variant='danger' block size='sm'>Leave Room</b-button>
      </div>
  </div>
</template>

<script>
import PlayerList from './PlayerList.vue'

export default {
    components: { 
        PlayerList
    }
}
</script>

<style>
.sidebar{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; 
    left: 0; 
    background-color: #222;
    width: 170pt;
    padding: 10pt;
    height: calc(100vh - 20pt);
    text-align: left;
    color: white;
}

.sidebar h2{
    margin: 0 10pt 4pt;
}

.input-group{
    padding: 0 10pt;
}
</style>