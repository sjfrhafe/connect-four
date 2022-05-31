<template>
  <div>
      <p>hello</p>
      this is the key: {{key}}
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
    data: () => ({
        key: null, 
        socket: null
    }), 
    created(){
        this.key = this.$route.params.key
        console.log(this.key)
        this.socket = io('ws://localhost:3000', {
            transports: ['websocket'], 
            path: '/gamews', 
            auth: {token: this.key}
        })
        this.socket.on('message', console.log)
        setInterval(() => {
            this.socket.emit('message', 'was geht ab')
        }, 3000)
    }
}
</script>

<style>

</style>