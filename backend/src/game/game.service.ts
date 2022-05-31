import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { createClient } from 'redis';
import { Player } from 'src/player/player.entity';
import { sign, verify } from 'jsonwebtoken'

@Injectable()
export class GameService {

    private redisClient

    constructor(private readonly configService: ConfigService){
        this.redisClient = createClient({
            legacyMode: true, 
            url: configService.get('REDIS_URL')
          })

        this.redisClient.connect()
    }

    async createGame(player: Player): Promise<string>{
        const key = await this.createKey(10)
        await this.redisClient.set('game:' + key, JSON.stringify({key, players: [player]}))
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

}
