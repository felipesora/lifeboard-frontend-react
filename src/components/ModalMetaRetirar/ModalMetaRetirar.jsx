import IconeFechar from '../../assets/images/icone-fechar.png';
import { useState } from 'react';


const ModalMetaRetirar = ({ aberto, onClose, onRetirar, valorRetirar, setValorRetirar }) => {

    const [erro, setErro] = useState('');

    const handleAdicionar = async () => {
        const valor = parseFloat(valorRetirar);

        if (isNaN(valor) || valor <= 0) {
            setErro('O valor a ser retirado deve ser maior que zero.');
            return;
        }

        try {
            setErro('');
            await onRetirar();
            onClose();

        } catch (error) {
            console.error('Erro completo:', error);

            if (error.status === 400) {
                setErro(error.data?.message || 'Erro ao retirar saldo.');
            } else {
                setErro('Erro inesperado. Tente novamente.');
            }
        }
    };

    if (!aberto) return null;

    return (
        <div className="modal_overlay_meta">
            <div className="modal_conteudo_meta">
                <div className='modal_conteudo_meta_cabecalho'>
                    <h2>Retirar Saldo</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />

                <div className='modal_conteudo_meta_conteudo'>

                    <p>Digite o valor que deseja retirar da meta.</p>
                    <input
                        type="number"
                        step="any"
                        name="valor"
                        placeholder="Digite o valor"
                        value={valorRetirar}
                        onChange={(e) => setValorRetirar(e.target.value)}
                    />

                    {erro && <p className="erro_meta">{erro}</p>}

                    <div className="modal_meta_botoes">
                        <button className='modal_meta_botao_cancelar' type="button" onClick={onClose}>Cancelar</button>
                        <button className='modal_meta_botao_adicionar' type="button" onClick={handleAdicionar}>Retirar Valor</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ModalMetaRetirar;