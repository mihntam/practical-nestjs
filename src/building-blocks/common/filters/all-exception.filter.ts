/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
} from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private _logger = new Logger(AllExceptionFilter.name);

    public catch(exception: HttpException, host: ArgumentsHost): void {
        // const ctx = host.switchToHttp();
        // const exceptionResponse = exception.getResponse() as { message: any };
        // const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        // const status = exception.getStatus();

        // this._logger.error(exception.message, exception.stack);

        // response.status(status).json({
        //     statusCode: status,
        //     timestamp: new Date().toISOString(),
        //     path: request.url,
        //     message: exceptionResponse.message,
        // });

        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        this.handleMessage(exception);

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : 500;

        const message =
            exception instanceof HttpException
                ? (exception.getResponse() as any).message || exception.message
                : "Internal server error";

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }

    private handleMessage(exception: HttpException | Error): void {
        let message = "Internal server error";

        if (exception instanceof HttpException) {
            message = JSON.stringify(exception.getResponse());
        }
        else if (exception instanceof Error) {
            message = exception.stack.toString();
        }

        this._logger.error(message, exception.stack);
    }
}
