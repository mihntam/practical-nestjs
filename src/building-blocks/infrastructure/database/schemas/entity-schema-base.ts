import { EntitySchemaColumnOptions } from "typeorm";

export const EntityBaseSchema = {
  id: {
    type: 'uuid',
    primary: true,
    nullable: false,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: "created_at",
    type: "timestamp with time zone",
    createDate: true,
    nullable: false,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: "updated_at",
    type: "timestamp with time zone",
    updateDate: true,
  } as EntitySchemaColumnOptions,
  deletedAt: {
    name: "deleted_at",
    type: "timestamp with time zone",
    updateDate: true,
  } as EntitySchemaColumnOptions,
};