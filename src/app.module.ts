import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@/building-blocks/infrastructure";
import { UserModule } from "@/features/user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
        }),
        CqrsModule.forRoot(),
        UserModule,
        LoggerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
