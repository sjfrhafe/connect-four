import { Body, Controller, Get, HttpCode, Post, Session } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    
    constructor(private readonly playerService: PlayerService){}
    
    @Get('me')
    async me(@Session() session): Promise<Player>{
        if(!session.player)
            session.player = await this.playerService.createAnonymousPlayer()

        return session.player
    }

    @Get('shuffle')
    @HttpCode(204)
    async shuffle(@Session() session){
        session.player = await this.playerService.shufflePlayer(session.player)
    } 

    @Post('update-name')
    @HttpCode(204)
    async updateName(@Session() session, @Body() body: {name}){
        console.log('update', body)
        session.player.name = body.name
    } 
}
