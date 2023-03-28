import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      message: 'OK',
    };
  }
  getHello(): string {
    return 'User movements recording service';
  }
}
