import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private logger = new Logger(AppController.name);

  @Get('health')
  getHealth() {
    this.logger.log('returning health check');
    return this.appService.getHealth();
  }
}
