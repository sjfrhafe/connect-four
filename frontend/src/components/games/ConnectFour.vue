<template>
      <div class="gamecontainer" ref='gamecontainer'>
          <div class="over">
              <p v-if='$store.getters.gameState.currentTurnPlayer && $store.getters.gameState.status === "running"'>it is {{$store.getters.gameState.currentTurnPlayer.name}}'s turn</p>
              <p v-if='$store.getters.gameState.message'>{{$store.getters.gameState.message}}</p>
              <b-button v-if='$store.getters.gameState.status === "finished"' @click="emit('start')">Play Again</b-button>
              <p v-if='$store.getters.gameState.status === "waiting"'>Waiting for Opponent</p>
              <b-button v-if='$store.getters.gameState.status === "prepare"' @click="emit('start')">Start Game</b-button>
            </div>
      </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import * as keyboardjs from 'keyboardjs'

const resources = PIXI.Loader.shared.resources
const loader = PIXI.Loader.shared
const Sprite = PIXI.Sprite

export default {
    data: () => ({
        game: null, 
        sprites: []
    }), 
    mounted(){
        this.setupGame()
    }, 
    destroyed(){
        this.$store.commit('closeSocket')
        this.game.ticker.remove(this.gameloop, this.game)
        this.game.destroy()
        loader.reset()
        keyboardjs.reset()
    }, 
    methods: {
        addOne(){
            this.emit('add-one')
        }, 
        emit(method, params){
            this.$store.dispatch('emit', {method, params})
        }, 
        setup(){
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

            keyboardjs.bind('left', () => {
                this.emit('move', {direction: -1})
            })

            keyboardjs.bind('right', () => {
                this.emit('move', {direction: 1})
            })

            keyboardjs.bind('down', () => {
                this.emit('down')
            })

            loader
                .add('connect-four/coin_red.png')
                .add('connect-four/coin_yellow.png')
                .load(this.setup)

            this.$refs.gamecontainer.appendChild(this.game.view)

        }, 
        addCoin(coin){
            let coinSprite = new Sprite(resources[coin.playerOne ? 'connect-four/coin_red.png' : 'connect-four/coin_yellow.png'].texture)
            this.game.stage.addChild(coinSprite);
            this.sprites.push({id: coin.id, sprite: coinSprite, remove: false})
        }, 
        positionCoin(coin){
            let coinSprite = this.sprites.find(({id}) => id === coin.id)
            coinSprite.sprite.x = coin.position.x * 100 + 10
            coinSprite.sprite.y = coin.position.y * 100 + 10
            coinSprite.remove = false
        }, 
        gameloop(){
            this.sprites.forEach(sprite => {
                sprite.remove = true
            })

            this.$store.getters.gameState.coins.forEach(coin => {
                if(!this.sprites.find(({id}) => id === coin.id)){
                    this.addCoin(coin)
                }
                this.positionCoin(coin)
            });

            this.sprites = this.sprites.filter(sprite => {
                if(sprite.remove){
                    this.game.stage.removeChild(sprite.sprite)
                    return false
                }
                return true
            })
        }, 
    }
}
</script>

<style>
.over{
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
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
    position: relative;
}
</style>