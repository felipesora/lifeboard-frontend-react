import { obterDadosUsuario } from "./usuarioService";


export async function obterDadosTransacao(id) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/transacoes/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao obter os dados da transação.');
    }

    return await response.json();
}

export async function cadastrarTransacao(transacao) {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId');

    const usuario = await obterDadosUsuario(idUser);

    const idFinanceiro = usuario.financeiro.id_financeiro;

    const response = await fetch('http://localhost:8080/api/transacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            descricao: transacao.descricao,
            valor: transacao.valor,
            tipo: transacao.tipo,
            categoria: transacao.categoria,
            id_financeiro: idFinanceiro
        }),
    });

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(`Cadastro de transação! ${erro}`);
    }

    return await response.json();
}

export async function editarDadosTransacao(idTransacao, novaTransacao) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/transacoes/${idTransacao}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            descricao: novaTransacao.descricao,
            valor: novaTransacao.valor,
            tipo: novaTransacao.tipo,
            categoria: novaTransacao.categoria,
            id_financeiro: novaTransacao.id_financeiro
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao editar os dados da transação.');
    }

    return await response.json();
}

export async function deletarTransacao(idTransacao) {
        const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/transacoes/${idTransacao}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao deletar transação.');
    }

    return;
}