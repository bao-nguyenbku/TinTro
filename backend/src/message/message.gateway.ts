import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway(81, { namespace: 'message', transports: ['websocket'] })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {
    Logger.log('Init websocket');
  }

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }
}
