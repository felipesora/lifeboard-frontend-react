import './ModalLogout.css';
import IconeFechar from '../../assets/images/icone-fechar.png';
import { useNavigate } from 'react-router-dom';


const ModalLogout = ({ aberto, onClose }) => {
    const navigate = useNavigate();

    if (!aberto) return null;

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    return (
        <div className="modal_overlay_sair_conta">
            <div className="modal_conteudo_sair_conta">
                <div className='modal_conteudo_sair_conta_cabecalho'>
                    <h2>Sair da Conta</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />

                <div className='modal_conteudo_sair_conta_conteudo'>
                    <div className='modal_sair_conta_texto'>
                        <p>Tem certeza que deseja sair da sua conta?</p>
                    </div>

                    <div className="modal_sair_conta_botoes">
                        <button className='modal_sair_conta_botao' type="button" onClick={onClose}>Cancelar</button>
                        <button className='modal_sair_conta_botao' type="button" onClick={handleLogout}>Sair</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ModalLogout;