import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { createClient } from 'redis';
import { Player } from 'src/player/player.entity';
import { sign, verify } from 'jsonwebtoken'
import { Socket } from 'socket.io';
import { Room } from './room/room.lib';
import { ConnectFourRoom } from './room/connect-four.room';
import { RoomManager } from './room/room.manager';

@Injectable()
export class GameService {

    private redisClient
    private roomManager: RoomManager

    constructor(private readonly configService: ConfigService){
        this.roomManager = new RoomManager()        
        
        this.redisClient = createClient({
            legacyMode: true, 
            url: configService.get('REDIS_URL')
          })

        this.redisClient.connect()
    }

    async createGame(player: Player): Promise<string>{
        const key = await this.createKey(10)
        this.roomManager.createRoom('connect-four', key)
        return key
    }

    async createKey(length: number): Promise<string>{
        const definition = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let key = ''

        for(let iterator = 0; iterator < length; iterator++)
            key = key.concat(definition[Math.floor(Math.random() * definition.length)]) //pseudo random

        return key
    }

    async generateJoinToken(player: Player, key: string): Promise<string>{
        return sign({player, key}, this.configService.get('JOINTOKEN_SECRET'))
    }

    async verifyJoinToken(token: string): Promise<any>{
        return verify(token, this.configService.get('JOINTOKEN_SECRET'))
    }

    joinRoom(player: Player, socket: Socket, key: string){
        this.roomManager.joinRoom(key, player, socket)
    }

}
