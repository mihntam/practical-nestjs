import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateProfileCommand } from "./use-cases/command/create-profile.command";

@Injectable()
export class UserService {
    constructor(private readonly commandBus: CommandBus) {}

    async create(_createUserDto: CreateUserDto) {
        const createUserCommand = new CreateProfileCommand(
            _createUserDto.userName,
        );
        const id = await this.commandBus.execute(createUserCommand);
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
