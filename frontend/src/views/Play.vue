<template>
  <div class="play">
      <side-bar />
      <div class="gamecontainer" ref='gamecontainer'></div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import * as PIXI from 'pixi.js'

export default {
    data: () => ({
        game: null
    }), 
    created(){
        this.$store.commit('setJoinToken', this.$route.params.joinToken)
        this.$store.dispatch('connectWs')
    }, 
    mounted(){
        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas";
        }
        PIXI.utils.sayHello(type);

        const resources = PIXI.Loader.shared.resources
        const loader = PIXI.Loader.shared
        const Sprite = PIXI.Sprite
    
        this.game = new PIXI.Application({ 
            width: 800,
            height: 500,
            antialias: true,
            backgroundAlpha: false,
            resolution: 1
        })
        
        const setup = () => {
            console.log(resources['connect-four/coin_red.png'].texture)
            const cat = new Sprite(resources['connect-four/coin_red.png'].texture);
            this.game.stage.addChild(cat);
            cat.x = 20
            cat.y = 20
        }

        loader
            .add('connect-four/coin_red.png')
            .load(setup)

        this.$refs.gamecontainer.appendChild(this.game.view)
    }, 
    methods: {
        addOne(){
            this.emit('add-one')
        }, 
        emit(method, params){
            this.$store.dispatch('emit', {method, params})
        }
    }, 
    components: {
        SideBar
    }
}
</script>

<style>
.play{
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
}
canvas{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    background-color: black;
    width: 80%;
    border: solid 1pt white;
}

.gamecontainer{
    background-color: black;
}
</style>