import { obterDadosUsuario } from "./usuarioService";

export async function obterDadosMeta(id) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/metas/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao obter os dados da meta.');
    }

    return await response.json();
}

export async function cadastrarMeta(meta) {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId');

    const usuario = await obterDadosUsuario(idUser);

    const idFinanceiro = usuario.financeiro.id_financeiro;

    const response = await fetch('http://localhost:8080/api/metas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            nome: meta.nome,
            valor_meta: meta.valor_meta,
            valor_atual: meta.valor_atual,
            data_limite: meta.data_limite,
            id_financeiro: idFinanceiro
        }),
    });

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(`Cadastro de meta! ${erro}`);
    }

    return await response.json();
}

export async function editarDadosMeta(idMeta, novaMeta) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/metas/${idMeta}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: novaMeta.nome,
            valor_meta: novaMeta.valor_meta,
            valor_atual: novaMeta.valor_atual,
            data_limite: novaMeta.data_limite,
            id_financeiro: novaMeta.id_financeiro
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao editar os dados da meta.');
    }

    return await response.json();
}

export async function deletarMeta(idMeta) {
        const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/metas/${idMeta}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao deletar meta.');
    }

    return;
}