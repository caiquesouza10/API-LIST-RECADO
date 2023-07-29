import { recadosDB } from "../data/recados";
import { Recado } from "../models/recado.model";

export class RecadoRepository {
    public static criarRecado(recado: Recado){
        return recadosDB.push(recado)
    }

    public static listTodosRecados(idUser: string ){
        return recadosDB.filter(
            (recado) => recado.user.id === idUser && recado.arquivado === false
          );
    }

    public static delete(recadoIndex: number, number: number){
        return recadosDB.splice(recadoIndex, number);
    }

    public static buscaRecado(idRecados: string){
        return recadosDB.findIndex(
            (recado) => recado.id === idRecados
          );
    }

    public static update(idRecados: string){
        return recadosDB.find(
            (recado) => recado.id === idRecados
          )
    }

    public static ListararRecadosArquivados(){
        return recadosDB.filter((f) => f.arquivado === true);
    }
}