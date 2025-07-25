import { obterDadosUsuario } from "../services/usuarioService";

export async function obterMetas() {
    const idUser = localStorage.getItem('userId');

    if (!idUser) {
        throw new Error('Usuário não logado!');
    }

    const usuario = await obterDadosUsuario(idUser);

    return usuario.financeiro?.metas || [];
}