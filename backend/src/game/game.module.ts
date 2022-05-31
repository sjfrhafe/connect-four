import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigService } from "@nestjs/config";
import { GameGateway } from './game.gateway';

@Module({
  controllers: [GameController],
  providers: [GameService, ConfigService, GameGateway]
})
export class GameModule {}
