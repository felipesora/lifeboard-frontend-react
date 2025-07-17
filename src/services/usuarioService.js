export async function obterDadosUsuario(id) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/";
        throw new Error("Token expirado ou inválido.");
    }

    if (!response.ok) {
        throw new Error('Erro ao obter os dados do usuário.');
    }

    return await response.json();
}

export async function editarFinanceiroUsuario(idFinanceiro, financeiro) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/financeiros/${idFinanceiro}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            saldo_atual: financeiro.saldo_atual,
            salario_mensal: financeiro.salario_mensal,
            id_usuario: financeiro.id_usuario,
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao editar os dados do financeiro.');
    }

    return await response.json();
}

export async function editarDadosUsuario(idUsuario, novoUsuario) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/usuarios/${idUsuario}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: novoUsuario.nome,
            email: novoUsuario.email,
            senha: novoUsuario.senha,
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao editar os dados do usuário.');
    }

    return await response.json();
}

export async function deletarUsuario(id) {
        const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao deletar conta.');
    }

    return;
}