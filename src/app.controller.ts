import { BadRequestException, Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("/error")
    getError(): void {
        throw new Error("This is a test error!");
    }

    @Get("/http-error")
    getHttpError(): void {
        throw new BadRequestException("This is a test http error!");
    }
}
