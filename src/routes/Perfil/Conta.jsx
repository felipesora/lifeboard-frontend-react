import { useNavigate } from 'react-router-dom';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './Conta.css';
import { useEffect, useState } from 'react';
import { obterMetas } from '../../hooks/obterMetas';

const Conta = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [nome, setNome] = useState('Felipe Ulson Sora'); 
    const [email, setEmail] = useState('felipeusora@gmail.com');
    const [senha, setSenha] = useState('senha123');

    useEffect(() => {
            const fetchDadosUsuario = async () => {
                try {
    
                    // Metas
                    const metas = await obterMetas();
                    setTodasMetas(metas);
                    setMetas(metas);
    
                } catch (erro) {
    
                    console.error("Erro ao obter dados do usuário:", erro);
                }
            };
    
            fetchDadosUsuario();
        }, []);

    return (
        <div className="dashboard_container">
            <MenuLateral />
            <main className="dashboard_main_conta">
                <p>Minha Conta</p>

                <div className='conta_container'>

                    <div className='dados_conta'>

                        <div>
                            <p>Nome: <span>{nome}</span></p>
                        </div>

                        <div>
                            <p>Email: <span>{email}</span></p>
                        </div>

                        <div>
                            <p>Senha: <span>{senha}</span></p>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    )
}

export default Conta;