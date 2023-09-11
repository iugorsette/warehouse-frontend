import { Controller, Get ,Post , Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get('cats')
  findAll(): string {
    return 'This action returns all cats';
  }
  @Post()
  postMessage(@Req() message: Request) {
    message.query;
    return message;
  }
}

export class CatControllers2 implements Controller {
    constructor(
        private readonly http: Http,
        private readonly catsService: CatsService,
    ) {
    }
    findAll(): string {
        this.http.get('http://localhost:3000/');
        return 'This action returns all cats';
      }
}