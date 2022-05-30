import { Controller, Get, Session } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    
    constructor(private readonly playerService: PlayerService){}
    
    @Get('me')
    async me(@Session() session): Promise<Player>{

        if(!session.player){
            session.player = {}
            session.player.isTemp = true
            session.player.name = await this.playerService.getRandomPlayerName()
        }

        return session.player

    }
}
