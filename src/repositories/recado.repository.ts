import { recadosDB } from "../data/recados";
import { Recado } from "../models/recado.model";


export class RecadoRepository {
    public criarRecado(recado: Recado){
        return recadosDB.push(recado)
    }

    public listTodosRecados(idUser: string ){
        return recadosDB.filter(
            (recado) => recado.user.id === idUser && recado.arquivado === false
          );
    }

    public delete(recadoIndex: number, number: number){
        return recadosDB.splice(recadoIndex, number);
    }

    public buscaRecado(idRecados: string){
        return recadosDB.findIndex(
            (recado) => recado.id === idRecados
          );
    }

    public update(idRecados: string){
        return recadosDB.find(
            (recado) => recado.id === idRecados
          )
    }

    public ListararRecadosArquivados(){
        return recadosDB.filter((f) => f.arquivado === true);
    }



}