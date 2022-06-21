import { Socket } from "socket.io";
import { Player } from "src/player/player.entity";
import { ConnectFourRoom } from "./connect-four.room";
import { Room } from "./room.lib";

export class RoomManager{
    private rooms: Room[] = []

    printRooms(){
        this.rooms.forEach(room => console.log(room.key))
    }

    createRoom(game: string, key: string){
        switch (game){
            case 'connect-four': 
                this.rooms.push(new ConnectFourRoom(key, this))
                break
        }
    }

    joinRoom(key: string, player: Player, socket: Socket){
        const targetRoom = this.rooms.find((room: Room) => room.key === key)
        
        //room not found guard
        if(!targetRoom){
            socket.emit('error', 'room not found')
            socket.disconnect()
            return
        }

        targetRoom.join(player, socket)
    }

    removeRoom(key: string){
        this.rooms = this.rooms.filter((room: Room) => room.key !== key)
    }

}