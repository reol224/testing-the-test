import { Inject, Injectable } from '@nestjs/common';
import * as console from 'console';
import { OptionPredicator } from 'typia/lib/programmers/helpers/OptionPredicator';
import undefined = OptionPredicator.undefined;

@Injectable()
export class WebhookHandlerService{
  async handle(payload: any): Promise<void> {
    console.log('Received: ' + JSON.stringify(payload));
    //return Promise.resolve(undefined);
  }
}