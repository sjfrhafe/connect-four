import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import { GameService } from './game.service';

@WebSocketGateway({path: '/gamews', cors: '*'})
export class GameGateway implements OnGatewayConnection{

  constructor(private readonly gameService: GameService){}

  async handleConnection(client: any, ...args: any[]) {
    try{
      const {player, key} = await this.gameService.verifyJoinToken(client.handshake.auth.token)
      this.gameService.joinRoom(player, client, key)
    }catch(error){
      client.disconnect()
    }
  }
}
