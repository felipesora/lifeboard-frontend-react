import './ModalMetaAdiconar.css';
import IconeFechar from '../../assets/images/icone-fechar.png';
import { useState } from 'react';


const ModalMetaAdicionar = ({ aberto, onClose, onAdicionar, valorAdicionar, setValorAdicionar }) => {

    const [erro, setErro] = useState('');

    const handleAdicionar = () => {
        const valor = parseFloat(valorAdicionar);

        if (isNaN(valor) || valor <= 0) {
            setErro('O valor deve ser um número positivo.');
            return;
        }

        setErro('');
        onAdicionar();
        onClose();
    };

    if (!aberto) return null;

    return (
        <div className="modal_overlay_meta">
            <div className="modal_conteudo_meta">
                <div className='modal_conteudo_meta_cabecalho'>
                    <h2>Adicionar Saldo</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />

                <div className='modal_conteudo_meta_conteudo'>

                    <p>Digite o valor que deseja adicionar à meta.</p>
                    <input
                        type="number"
                        step="any"
                        name="valor"
                        placeholder="Digite o valor"
                        value={valorAdicionar}
                        onChange={(e) => setValorAdicionar(e.target.value)}
                    />

                    {erro && <p className="erro_meta">{erro}</p>}

                    <div className="modal_meta_botoes">
                        <button className='modal_meta_botao_cancelar' type="button" onClick={onClose}>Cancelar</button>
                        <button className='modal_meta_botao_adicionar' type="button" onClick={handleAdicionar}>Adicionar Valor</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ModalMetaAdicionar;