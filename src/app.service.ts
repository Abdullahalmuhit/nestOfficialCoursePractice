import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getMuhid(){
    return "Hello ! From Abdullah Al Muhid";
  }
}
