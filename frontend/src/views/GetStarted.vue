<template>
    <div class="getstarted">
        <background />
        <contrast>
            <div class="side-by-side">
                <h2>Join Game</h2>
                <h2>Create Game</h2>
                <div class="form">
                    <b-input v-model='key' class='mb-2' placeholder='roomcode'></b-input>
                        <b-button block @click="joinGame(key)">join</b-button>
                </div>
                <div class="form">
                    <b-button block @click="createGame">create</b-button>
                </div>
            </div>
        </contrast>
    </div>
</template>

<script>
import Background from '@/components/Background.vue'
import Contrast from '../components/Contrast.vue'

export default {
    data: () => ({
        key: ''
    }), 
    methods: {
        createGame(){
            fetch('/api/game/create')
                .then(data => data.text())
                .then(this.joinGame)
        }, 
        joinGame(key){
            fetch('/api/game/join/' + key)
                .then(data => data.text())
                .then(this.navigateToGame)
        }, 
        navigateToGame(joinToken){
            this.$router.push({name: 'Play', params: {joinToken}})
        }
    }, 
    components: { 
      Background, 
        Contrast 
    }
}
</script>

<style>
.side-by-side{
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.form{
    padding: 20pt;
}
</style>