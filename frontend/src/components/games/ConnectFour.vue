<template>
      <div class="gamecontainer" ref='gamecontainer'></div>
</template>

<script>
import * as PIXI from 'pixi.js'
const resources = PIXI.Loader.shared.resources
const loader = PIXI.Loader.shared
const Sprite = PIXI.Sprite

function keyboard(keyCode) {
    const key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = (event) => {
    if (event.keyCode === key.code) {
        if (key.isUp && key.press) {
        key.press();
        }
        key.isDown = true;
        key.isUp = false;
    }
    event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = (event) => {
    if (event.keyCode === key.code) {
        if (key.isDown && key.release) {
        key.release();
        }
        key.isDown = false;
        key.isUp = true;
    }
    event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}

export default {
    data: () => ({
        game: null, 
        sprites: {}
    }), 
    mounted(){
        this.setupGame()
    }, 
    destroyed(){
        this.$store.commit('closeSocket')
        this.game.ticker.remove(this.gameloop, this.game)
        this.game.destroy()
        loader.reset()
    }, 
    methods: {
        addOne(){
            this.emit('add-one')
        }, 
        emit(method, params){
            this.$store.dispatch('emit', {method, params})
        }, 
        setup(){
            const cat = new Sprite(resources['connect-four/coin_red.png'].texture);
            this.game.stage.addChild(cat);
            this.sprites.cat = cat
            
            cat.x = 20
            cat.y = 20

            this.game.ticker.add(this.gameloop, this.game)
        }, 
        setupGame(){
            this.game = new PIXI.Application({ 
                width: 800,
                height: 500,
                antialias: true,
                backgroundAlpha: false,
                resolution: 1
            })

            const left = keyboard(37)
            left.press = () => {
                this.emit('move', {direction: 1})
            }


            loader
                .add('connect-four/coin_red.png')
                .load(this.setup)

            this.$refs.gamecontainer.appendChild(this.game.view)

        }, 
        gameloop(){
            this.sprites.cat.x = (this.$store.state.gameStore.gameState.hover?.position || 0) * 40
        }, 
    }
}
</script>

<style>
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