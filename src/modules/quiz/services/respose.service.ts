import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Event } from 'src/constants/event.constants';
import { ResponseAddEvent } from '../events/response-add.event';

@Injectable()
export class ResponseService {
  @OnEvent(Event.RESPONSE_SUBMITTED)
  checkQuizCompleted(payload: ResponseAddEvent) {
    console.log({ payload });
  }
}
