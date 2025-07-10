export async function login(email, senha) {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        }),
    });

    if (!response.ok) {
        throw new Error('Login falhou! Verifique suas credenciais.');
    }

    const data = await response.json();
    return data.token;
}