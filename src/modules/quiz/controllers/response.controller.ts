import { Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { Event } from 'src/constants/event.constants';
import { ResponseAddEvent } from '../events/response-add.event';

@Controller('/response')
@ApiTags('Response')
export class ResponseController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Post()
  async handleQuestionResponse() {
    console.log('This is inside the controller');
    const payload = new ResponseAddEvent(1, 33);

    this.eventEmitter.emit(Event.RESPONSE_SUBMITTED, payload);
    return { message: 'Response taken' };
  }
}
