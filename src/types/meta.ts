export interface MetaResponse {
    id_meta: number;
    nome: string;
    valor_meta: number;
    valor_atual: number;
    status: "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";
    data_limite: string;
    id_financeiro: number;
}