<template>
  <div class="play">
      <ul>
          <li v-for='player in players' :key="player.id">{{player}}</li>
      </ul>

      <div>{{state}}</div>

      <b-button @click='addOne'>Count++ {{count}}</b-button>
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
    data: () => ({
        joinToken: null, 
        socket: null, 
        players: [], 
        state: {}
    }), 
    created(){
        this.joinToken = this.$route.params.joinToken

        this.socket = io('ws://localhost:3000', {
            transports: ['websocket'], 
            path: '/gamews', 
            auth: {token: this.joinToken}
        })
        
        this.socket.on('update-playerlist', players => {
            this.players = JSON.parse(players)
        })

        this.socket.on('set-state', state => {
            this.state = state
        })

        this.socket.onclose = () => this.$router.push({name: 'Home'})
    }, 
    methods: {
        addOne(){
            this.socket.emit('add-one')
        }
    }
}
</script>

<style>
.play{
    padding: 20px;
  display: inline-block;
  max-width: 400pt;
}
</style>