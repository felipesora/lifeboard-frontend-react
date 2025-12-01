import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  iss: string
  sub: string;
  id: number;
  exp: number;
}

// export async function cadastro(nome, email, senha) {
//     const response = await fetch('http://localhost:8080/api/usuarios', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             nome: nome,
//             email: email,
//             senha: senha
//         }),
//     });

//     if (!response.ok) {
//         const erro = await response.text();
//         throw new Error(`Cadastro falhou! ${erro}`);
//     }

//     return await response.json();
// }

export function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return false;
  }
}