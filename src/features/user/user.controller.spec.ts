import { CqrsModule } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { plainToInstance } from "class-transformer";

class BodyDto {
    name: string;
    age: number = 0;

    items: string[] = [];
}

describe("UserController", () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CqrsModule],
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    xit("should be defined", () => {
        expect(controller).toBeDefined();
    });

    test.each([
        { name: "missing items" },
        { name: "missing age" },
        { name: "user 01", age: 20, items: ["item 1", "item 2"] },
    ])("plain to instance covert", async (body) => {
        const payload = plainToInstance(BodyDto, body);

        console.log(`${JSON.stringify(body, null, 2)} => ${JSON.stringify(payload, null, 2)}`);
    });
});
