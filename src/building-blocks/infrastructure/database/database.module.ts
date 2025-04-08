import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DatabaseModuleOptions } from "./database.module-definition";
import { SnakeNamingStrategy } from "./snake-naming.strategy";

@Global()
@Module({})
export class DatabaseModule {
    public static register(options: DatabaseModuleOptions): DynamicModule {
        const typeOrmModule = TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: "postgres",
                url: configService.get<string>("DATABASE_URL"),
                logging:
                    configService.get<string>("LOG_ENABLED")?.toLowerCase() ===
                    "true",
                synchronize: false,
                migrations: [...options.migrations],
                migrationsTableName: "MigrationHistory",
                namingStrategy: new SnakeNamingStrategy(),
                autoLoadEntities: true,
                migrationsRun: true,
            }),
        });
        return {
            module: DatabaseModule,
            imports: [typeOrmModule],
        };
    }
}
