import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1690588835639 implements MigrationInterface {
  // new User(name, email, password)
  public async up(queryRunner: QueryRunner): Promise<void> {
    // AQUI FAZ
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // AQUI DESFAZ
    await queryRunner.dropTable("users", true, true, true);
  }
}
