import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RecadoEntity } from "./recado.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
  // @Column()
  // name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  /// ------- RELACIONAMENTOS -------
  // 0, n | 1, n => OneToMany
  @OneToMany(() => RecadoEntity, (entity) => entity.user)
  recados!: RecadoEntity[];
}
