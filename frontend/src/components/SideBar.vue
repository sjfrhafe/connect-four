<template>
  <div class="sidebar">
      <h4>invite</h4>
      <div class="input-group mb-3">
            <b-input :value='$store.getters.key' size='sm' class='mb-2'/>
            <b-button block variant='primary' size='sm'>Copy Link</b-button>
      </div>
      <hr>
      <h4>players</h4>
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
    background-color: #222;
    padding: 10pt;
    height: 100%;
    text-align: left;
    color: white;
}

.sidebar h4{
    margin: 0 10pt 4pt;
}

.input-group{
    padding: 0 10pt;
}
</style>