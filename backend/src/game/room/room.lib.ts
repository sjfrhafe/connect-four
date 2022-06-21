import { RedisSearchLanguages } from "@redis/search/dist/commands"
import { Socket } from "socket.io"
import { Player } from "src/player/player.entity"
import { RoomManager } from "./room.manager"

export abstract class Room{

    constructor(key: string, rommManager: RoomManager){
        this.key = key
        this.roomManager = rommManager
        this.players = []
        setTimeout(() => this.disposeIfEmpty(), 5000)
    }

    players: {player: Player, socket: Socket}[]
    key: string
    roomManager: RoomManager
    state: {}

    abstract initialized()
    abstract onAuth(player: Player)
    abstract onJoin(player: Player)
    abstract onLeave(player: Player)
    abstract onDispose()

    broadcast(method: string, params: any){
        this.players.forEach(({socket}) => {
            socket.emit(method, JSON.stringify(params))
        })
    }

    join(player: Player, socket: Socket){
        if(!this.onAuth(player)){
            socket.emit('error', 'authentication failed')
            socket.disconnect()
            return
        }

        this['gMessageMethods'].forEach(({requestName, propertyKey}) => {
            socket.on(requestName, data => {
                try{
                    data = JSON.parse(data)
                }catch{

                }finally{
                    this[propertyKey](player, data)
                }
            })
        })

        socket.conn.on('close', () => {
            player.active = false
            this.onLeave(player)
            this.disposeIfEmpty()
        })

        this.players = this.players.filter(target => target.player.id !== player.id)
        this.players.push({player, socket})

        player.active = true
        this.onJoin(player)
    }

    setState(dict: {}){
        Object.keys(dict).forEach(key => {
            this.state[key] = dict[key]
            this.broadcast('set-state', this.state)
        })
    }

    disposeIfEmpty(){
        if(this.players.filter(({player}) => player.active).length === 0){
            this.onDispose()
            this.roomManager.removeRoom(this.key)
        }
    }
}

export function GameRoom<T extends { new(...args: any[]): {} }>(Base: T) {
    return class extends Base {
        gMessageMethods: any[]
        
        constructor(...args: any[]) {
            super(...args);
            this.gMessageMethods = Base.prototype['gMessage'] || []
            this['initialized']()
        }

        handleGMessage(method, params){
            const methodName = this.gMessageMethods[method]
            this[methodName]?.(params)
        }
    }
}

export function gMessage(requestName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target['gMessage'] = target['gMessage'] || []
        target['gMessage'].push({requestName, propertyKey})
    };
}


