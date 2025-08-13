import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';
import IconeNotFound from '../../assets/images/not-found.png';

const NotFound = () => {
    const navigate = useNavigate();

    const handleVoltar = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/controle-financeiro');
        }
    }

    return (
        <div className="not-found-container">
            <img src={IconeNotFound} alt="Imagem de Não Encontrado" />
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <p>Ops! A página que você procura não existe.</p>
            <button onClick={handleVoltar}>Voltar</button>
        </div>
    );
}

export default NotFound;