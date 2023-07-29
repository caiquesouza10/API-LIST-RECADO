import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableRecados1690588902215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recados",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
          },
          {
            name: "arquivado",
            type: "bool",
          },
          {
            name: "id_user",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "fk_recados_users",
            columnNames: ["id_user"], // QUAL COLUNA DESSA TABELA
            referencedTableName: "users", // QUAL TABELA EU REFERENCIO => users
            referencedColumnNames: ["id"], // QUAL COLUNA DA TABELA REFERENCIA EU DEVE OLHAR => users(id)
          }),
        ],
        // EXEMPLO DE CHECK
        // checks: [
        //   new TableCheck({
        //     name: "ck_arquivado_valido",
        //     columnNames: ["arquivado"],
        //     expression: 'aqui_validacao'
        //   }),
        // ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recados", true, true, true);
  }
}
