import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import { GameService } from './game.service';

@WebSocketGateway({path: '/gamews', cors: '*'})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect{

  constructor(private readonly gameService: GameService){}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: unknown, @ConnectedSocket() client: any) {

  }

  async handleConnection(client: any, ...args: any[]) {
    const joinData = await this.gameService.verifyJoinToken(client.handshake.auth.token)

    client.disconnect()
  }

  handleDisconnect(client: any) {
    
  }

}
