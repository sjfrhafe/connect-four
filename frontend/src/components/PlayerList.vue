<template>
  <div class="player-list">
      <player-list-item v-for='player in $store.getters.playerList' :key="player.id" :player='player'/>
  </div>
</template>

<script>
import PlayerListItem from './PlayerListItem.vue'
export default {
    components: { PlayerListItem }
}
</script>

<style>
.player-list{
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}
</style>