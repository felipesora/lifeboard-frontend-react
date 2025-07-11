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