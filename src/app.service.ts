import { Injectable } from '@nestjs/common';

@Injectable()P
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
