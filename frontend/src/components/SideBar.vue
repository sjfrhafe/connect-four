<template>
  <div class="sidebar">
      <h4>invite</h4>
      <div class="input-group mb-3">
            <b-input disabled :value='$store.getters.key' size='sm' class='mb-2'/>
            <b-button @click="copyLink" block variant='primary' size='sm'>Copy Link</b-button>
      </div>
      <hr>
      <h4>players</h4>
      <player-list />
      <div class="input-group mt-auto">
        <b-button varinat='dark' block size='sm' target='_blank' href='https://github.com/sjfrhafe/connect-four/issues/new/choose'>Report Error</b-button>
        <b-button variant='danger' block size='sm' @click="$router.push('/')">Leave Room</b-button>
      </div>
  </div>
</template>

<script>
import PlayerList from './PlayerList.vue'

export default {
    components: { 
        PlayerList
    }, 
    methods: {
        copyLink(){
            navigator.clipboard.writeText('https://games.simplyfred.de/#/getstarted?t=' + this.$store.getters.key)
            this.$store.dispatch('alert', {message: 'Link Copied', type: 'success'})
        }
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
    margin: 0 10pt 8pt;
    font-size: .9em;
    font-weight: bold;
    padding-bottom: 8pt;
    border-bottom: solid 1pt white;
}

.input-group{
    padding: 0 10pt;
}
</style>