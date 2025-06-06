import { Usuario } from "../auth/model/usuario";
import { Categoria } from "./categoria";

export interface Transacao {
    id: number,
    descricao: string,
    valor: number,
    tipo: string,
    categoria: Categoria,
    usuario: Usuario,
    dataVencimento: string,
    dataCriacao: string
}
