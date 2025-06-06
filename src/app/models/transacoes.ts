import { Transacao } from "./transacao";

export interface Transacoes {
    transacoes: Transacao[],
    totalReceitas: number,
    totalDespesas: number,
    saldo: number
}
