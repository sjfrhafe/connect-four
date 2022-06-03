import { Player } from 'src/player/player.entity'
import { Room, GameRoom, gMessage } from './room.lib'

@GameRoom
export class ConnectFourRoom extends Room{
    state = {
        key: '', 
        counter: 0, 
        playerlist: [], 
        points: {}
    }
    
    initialized() {
        this.setState({key: this.key})
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

    @gMessage('add-one')
    addOne(player, params){
        this.state.points[player.id]++
        this.setState({counter: this.state.counter + 1, points: this.state.points})
    }
}