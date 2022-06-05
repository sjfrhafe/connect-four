import { Injectable } from '@nestjs/common';
import { Player } from './player.entity';
import { faker } from '@faker-js/faker'
import { createHash } from 'crypto'

@Injectable()
export class PlayerService {
    async getPlayer(id: number): Promise<Player>{
        return null
    }

    async createAnonymousPlayer(): Promise<Player>{
        return {
            id: await this.getRandomPlayerId(), 
            name: await this.getRandomPlayerName(), 
            avatar: await this.getRandomPlayerAvatar()
        } as Player
    }

    async getRandomPlayerName(): Promise<string>{
        return `${faker.hacker.ingverb()} ${faker.animal.type()}`
    }

    async getRandomPlayerAvatar(): Promise<string>{ //for testing purposes
        return 'avatar_dummy.png'
    }

    async getRandomPlayerId(): Promise<string>{
        return createHash('sha256').update(Math.random().toString()).digest('base64')
    }
}
