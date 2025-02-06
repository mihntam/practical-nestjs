import { v7 as uuidv7 } from 'uuid';

export abstract class EntityBase {
  readonly id!: string;
  readonly createdAt!: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  protected constructor(id?: string) {
    this.id = id ?? uuidv7();
    this.createdAt = new Date();
  }
}
