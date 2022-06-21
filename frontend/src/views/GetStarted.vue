<template>
    <div class="getstarted">
        <background />
        <contrast>
            <div class="side-by-side">
                <div>
                    <h3>Join Game</h3>
                    <div class="form">
                        <b-input v-model='key' class='mb-2' placeholder='roomcode'></b-input>
                        <b-button variant="primary" block @click="joinGame(key)">join</b-button>
                    </div>

                    <h3>Create Game</h3>
                    <div class="form">
                        <b-button variant="primary" block @click="createGame">create</b-button>
                    </div>
                </div>
                <div class='right'>
                    <h4 class="mb-3">Customize your Avatar</h4>
                    <div class="avatar-large mb-2" @click='shuffle'>
                        <img :src="'/avatar/' + $store.getters.me.avatar" alt="">
                    </div>
                    <b-input-group class="mt-3">
                        <b-input v-model='$store.getters.me.name'></b-input>
                        <b-input-group-append>
                            <b-button @click="updateName" variant="primary">Save</b-button>
                        </b-input-group-append>
                    </b-input-group>
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
    mounted(){
        this.key = this.$route.query.t || ''
        this.$store.dispatch('fetchMe')
    }, 
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
            this.$store.commit('setJoinToken', joinToken)
            this.$router.push({name: 'Play'})
        }, 
        shuffle(){
            fetch('/api/player/shuffle')
                .then(() => this.$store.dispatch('fetchMe'))
        }, 
        updateName(){
            fetch('/api/player/update-name', {
                method: 'POST', 
                body: JSON.stringify({name: this.$store.getters.me.name}), 
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.$store.dispatch('alert', {message: 'Username saved', type: 'success'})
            })
        }
    }, 
    components: { 
      Background, 
        Contrast 
    }
}
</script>

<style >
.side-by-side{
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: center;
    align-items: center;
}

.form{
    padding: 6pt 20pt 20pt;
}

.avatar-large{
    width: 30%;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    display: inline-block;
}

.avatar-large:hover::after{
    content: 'click to change';
    position: absolute; 
    left: 0; 
    top: 0;
    font-size: 1em;
    color: white;
    width: 100%;
    height: 100%;
    background-color: rgba(34, 34, 34, 0.217);
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
}

.avatar-large img{
    width: 100%;
}

.right{
    border-left: solid 1pt #888;
    padding: 20pt;
}

@media (max-width: 800px) {
    .side-by-side{
        display: block;
    }

    .right{
        border-top: solid 1pt #888;
        border-left: none;
    }
}

</style>