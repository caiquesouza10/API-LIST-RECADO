import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity("recados")
export class RecadoEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  arquivado!: boolean;

  @Column({ name: "id_user" })
  idUser!: string;

  /// ---- RELACIONAMENTOS ------
  @ManyToOne(() => UserEntity, (entity) => entity.recados)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" }) // SEMPRE EXISTE NA TABELA Q TEM A FK
  user!: UserEntity;
}
