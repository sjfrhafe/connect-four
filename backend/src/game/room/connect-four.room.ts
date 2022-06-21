import { timeStamp } from 'console'
import { Player } from 'src/player/player.entity'
import { Room, GameRoom, gMessage } from './room.lib'

@GameRoom
export class ConnectFourRoom extends Room{
    private coinId = 0

    state = {
        key: '', 
        playerlist: [], 
        points: {}, 
        coins: [], 
        playerOne: null, 
        status: 'waiting', 
        currentTurnPlayer: null, 
        dimensions: {
            x: 8, 
            y: 4
        }, 
        message: null
    }

    initialized() {
        this.setState({key: this.key})
    }

    onAuth(player: Player) {
        return this.players.length < 2 || this.players.find(item => item.player.id === player.id)
    }

    onJoin(player: Player) {
        this.state.points[player.id] = 0

        let status
        if(this.players.length < 2){
            status = 'waiting'
        }else if(this.state.status === 'running'){
            status = 'running'
        }else{
            status = 'prepare'
        }

        this.setState({playerlist: this.players.map(item => item.player), points: this.state.points, status})
    }

    onLeave(player: Player) {
        this.setState({playerlist: this.players.map(item => item.player)})
    }

    onDispose() {
        console.log('raum sollte zerstört werden')
    }

    @gMessage('start')
    start(player){
        this.setState({status: 'running', currentTurnPlayer: player, playerOne: player.id, coins: [], message: ''})
        this.newCoin(true)
    }

    @gMessage('move')
    addOne(player, {direction}){
        if(this.state.status !== 'running')
            return

        if(player.id !== this.state.currentTurnPlayer.id)
            return

        let hoverCoin = this.state.coins.find(coin => coin.position.y === 0)
        if(hoverCoin && ((hoverCoin.position.x + direction) >= 0) && ((hoverCoin.position.x + direction) < this.state.dimensions.x)){
            hoverCoin.position.x += direction
            this.setState({coins: this.state.coins})
        }
    }

    @gMessage('down')
    down(player){
        if(this.state.status !== 'running')
            return

        if(player.id !== this.state.currentTurnPlayer.id)
            return

        let hoverCoin = this.state.coins.find(coin => coin.position.y === 0)
        let height = this.state.coins.filter(coin => coin.position.x === hoverCoin.position.x).sort((a, b) => a.position.y - b.position.y)?.[1]?.position.y || (this.state.dimensions.y + 1)
        
        if(hoverCoin.position.y === height - 1)
            return

        hoverCoin.position.y = height - 1
        
        this.checkSolved(() => {
            this.setState({status: 'finished', message: `${this.state.currentTurnPlayer.name} won the game` })
        })

        this.setState({coins: this.state.coins, currentTurnPlayer: this.state.playerlist.find(p => p.id !== player.id)})
        this.newCoin(!hoverCoin.playerOne)
    }

    newCoin(playerOne: boolean){
        const coin = {id: 'c' + this.coinId++, playerOne, position: {x: 0, y: 0}}
        this.state.coins.push(coin)
        this.setState({coins: this.state.coins})
    }

    checkSolved(callback){
        const getPlayer = (x, y) => {
            let coin = this.state.coins.find(coin => (coin.position.x === x) && (coin.position.y === y))
            if(!coin)
                return 0
            if(coin.playerOne)
                return 1
            return 2
        }

        this.state.coins.filter(coin => coin.position.y !== 0).forEach(coin =>{
            let x = coin.position.x
            let y = coin.position.y
            let player = getPlayer(x, y)

            if((player === getPlayer(x + 1, y)) && (player === getPlayer(x + 2, y)) && (player === getPlayer(x + 3, y)) ){
                callback()
            }

            if((player === getPlayer(x, y+1)) && (player === getPlayer(x, y+2)) && (player === getPlayer(x, y+3)) ){
                callback()
            }

            if((player === getPlayer(x+1, y+1)) && (player === getPlayer(x+2, y+2)) && (player === getPlayer(x+3, y+3)) ){
                callback()
            }

            if((player === getPlayer(x-1, y+1)) && (player === getPlayer(x-2, y+2)) && (player === getPlayer(x-3, y+3)) ){
                callback()
            }
        })
    }
}