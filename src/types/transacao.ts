export interface TransacaoResponse {
    id_transacao: number;
    descricao: string;
    valor: number;
    tipo: "ENTRADA" | "SAIDA" | "APLICACAO" | "RESGATE";
    data: string;
    categoria: "ALIMENTACAO" | "TRANSPORTE" | "LAZER" | "SAUDE" | "MORADIA" | "SALARIO" | "INVESTIMENTO" | "OUTROS";
    id_financeiro: number;
}