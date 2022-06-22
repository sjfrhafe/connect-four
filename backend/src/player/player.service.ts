import { Injectable } from '@nestjs/common';
import { Player } from './player.entity';
import { createHash } from 'crypto'

@Injectable()
export class PlayerService {

    private names: string[] = [
        'Leonard Hofstadter', 
        'Sheldon Cooper', 
        'Penny Hofstadter', 
        'Howard Wolowitz', 
        'Raj Koothrappali', 
        'Stuart Bloom', 
        'Leslie Winkle', 
        'Amy Farrah Fowler', 
        'Bernadette Rostenkowski-Wolowitz'
    ]

    private avatarCount: number = 7

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

    async shufflePlayer(player: Player): Promise<Player>{
        player.avatar = (player.avatar + this.avatarCount + 1) % this.avatarCount
        return player
    }

    async getRandomPlayerName(): Promise<string>{
        return this.names[Math.floor(Math.random() * this.names.length)]
    }

    async getRandomPlayerAvatar(): Promise<number>{ //for testing purposes
        return Math.floor(Math.random() * this.avatarCount)
    }

    async getRandomPlayerId(): Promise<string>{
        return createHash('sha256').update(Math.random().toString()).digest('base64')
    }
}
