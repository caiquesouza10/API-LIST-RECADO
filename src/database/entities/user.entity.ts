import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        name: "created_at",
    })
    createdAt: Date;
}
