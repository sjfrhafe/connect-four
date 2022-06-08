import { Player } from 'src/player/player.entity'
import { Room, GameRoom, gMessage } from './room.lib'

@GameRoom
export class ConnectFourRoom extends Room{
    state = {
        key: '', 
        counter: 0, 
        playerlist: [], 
        points: {}, 
        board: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]], 
        hover: {player: 0, position: 0}, 
        activePlayers: []
    }

    get allPlayers(): Player[]{
        return this.players.map(item => item.player)
    }

    get inactiveLPlayers(){
        return this.allPlayers.filter((player: Player) => this.state.activePlayers.includes(player))
    }

    initialized() {
        this.setState({key: this.key})
        this.newCoin(1)
    }

    onAuth(player: Player) {
        return true
    }

    onJoin(player: Player) {
        this.state.points[player.id] = 0


        this.setState({playerlist: this.players.map(item => item.player), points: this.state.points})
    }

    onLeave(player: Player) {
        this.setState({playerlist: this.players.map(item => item.player)})
    }

    onDispose() {
        console.log('raum sollte zerstört werden')
    }

    @gMessage('move')
    addOne(player, {direction}){
        this.state.hover.position += direction
        this.setState({hover: this.state.hover})
    }

    newCoin(player: number){
        this.setState({hover: {player, position: 0}})
    }
}