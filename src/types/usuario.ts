import type { FinanceiroResponse } from "./financeiro";

export interface UsuarioResponse {
    id_usuario: number;
    nome: string;
    email: string;
    senha: string;
    financeiro: FinanceiroResponse;
}