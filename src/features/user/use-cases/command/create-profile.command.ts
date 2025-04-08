import { Command } from "@nestjs/cqrs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

export class CreateProfileCommand extends Command<string> {
    constructor(public readonly userId: string) {
        super();
    }
}

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
    implements ICommandHandler<CreateProfileCommand>
{
    constructor() {}

    async execute(command: CreateProfileCommand): Promise<string> {
        const { userId } = command;
        return userId;
    }
}
