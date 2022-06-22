<template>
      <div class="gamecontainer" ref='gamecontainer'>
            <div class="over">
                <p v-if='$store.getters.gameState.currentTurnPlayer && $store.getters.gameState.status === "running"'>it is {{$store.getters.gameState.currentTurnPlayer.name}}'s turn</p>
                
            </div>

            <div v-if='$store.getters.gameState.status === "waiting"' class="end-modal">
                <h4>Waiting for Opponent</h4>
                <p>To invite somebody just copy the link on the left hand side and send it to your friends ... or enemies. </p>
            </div>

            <div v-if='$store.getters.gameState.status === "prepare"' class="end-modal">
                <h4 class="mb-3">ready?</h4>
                <p>You can start the game now. Use your arrow keys to move your coin. </p>
                <b-button variant='primary' @click="emit('start')">Start Game</b-button>
            </div>

            <div v-if='$store.getters.gameState.status === "finished"' class="end-modal">
                <img class='mb-3' :src="'/avatar/avatar_' + $store.getters.gameState.winner.avatar + '.jpg'" alt="">
                <h4 class="mb-3"><span class="winner">{{$store.getters.gameState.winner.name}}</span> won the game</h4>
                <p>you will be able to flex with your total score as soon as this function is implemented ;)</p>
                <b-button variant='primary'  @click="emit('start')">Play Again</b-button>
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
            if(!this.$store.getters.gameState.coins)
                return 

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
    display: flex;
    color: white;
    padding: 8pt;
}

canvas{
    border: solid 1pt white;
    width: 100%;
}

.gamecontainer{
    display: grid;
    align-content: center;
    align-items: center;
    justify-content: center;
    background-color: black;
    position: relative;
}

.end-modal{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 3pt;
    padding: 20pt;
    z-index: 3;
}

.end-modal > img{
    width: 40%;
    border-radius: 50%;
}

.winner{
    color: rgb(27, 182, 202);
}
</style>