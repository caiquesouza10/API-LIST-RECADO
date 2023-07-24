import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("recado")
export class RecadoEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    titulo: string;

    @Column()
    descricao: number;

    @Column()
    arquivado: boolean;

    @Column({
        name: "created_at",
    })
    createdAt: Date;

    @Column({
        name: "id_user",
    })
    idUser: string;
}
