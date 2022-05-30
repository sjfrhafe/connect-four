import { Injectable } from '@nestjs/common';
import { Player } from './player.entity';
import { faker } from '@faker-js/faker'

@Injectable()
export class PlayerService {
    async getPlayer(id: number): Promise<Player>{
        return null
    }

    async getRandomPlayerName(): Promise<string>{
        return `${faker.hacker.ingverb()} ${faker.animal.type()}`
    }
}
