import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
    const documentBuilder = new DocumentBuilder()
        .setTitle("Base api project")
        .setDescription("## description will be update later")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup("swagger", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    const port = process.env.PORT || 3000;

    console.info(`documentation: http://localhost:${port}/swagger`);
}
