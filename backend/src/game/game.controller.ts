import { Controller, Get, Param, Session } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {

    constructor(private readonly gameService: GameService){}

    @Get('create')
    async create(@Session() session): Promise<string>{
        console.log('create')
        return await this.gameService.createGame(session.player)
    }

    @Get('join/:key')
    async join(@Session() session, @Param('key') key: string): Promise<string>{
        return await this.gameService.generateJoinToken(session.player, key)
    }

}
