import { useState } from 'react';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './CadastroTransacao.css'
import { cadastrarTransacao } from '../../services/transacaoService';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';

const CadastroTransacao = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [descricaoTransacao, setDescricaoTransacao] = useState('');
    const [categoriaTransacao, setCategoriaTransacao] = useState('');
    const [tipoTransacao, setTipoTransacao] = useState('');
    const [valorTransacao, setValorTransacao] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleCadastroTransacao = async () => {

        if (!descricaoTransacao.trim() || !categoriaTransacao || !tipoTransacao || !valorTransacao) {
            setError("Preencha todos os campos.");
            setSuccess("");
            return;
        }

        if (descricaoTransacao.length < 3 || descricaoTransacao.length > 150) {
            setError("A descrição deve ter entre 3 e 150 caracteres.");
            setSuccess("");
            return;
        }

        const valorConvertido = parseFloat(valorTransacao);

        if (isNaN(valorConvertido) || valorConvertido <= 0) {
            setError('O valor da transação deve ser um número positivo.');
            return;
        }


        const transacao = {
            descricao: descricaoTransacao,
            valor: valorTransacao,
            tipo: tipoTransacao,
            categoria: categoriaTransacao,
        }

        try {
            await cadastrarTransacao(transacao);

            setError("");
            setSuccess("Transação cadastrada com sucesso!");

            setTimeout(() => {
                navigate("/transacoes");
            }, 1500);

        } catch (erro) {
            console.log(erro);

            setError("Erro ao cadastrar a transação. Tente novamente.");
            setSuccess("");
        }
    }

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main_cadastro_transacoes">
                <p>Controle Financeiro {'>'} Transações <span> {'>'} Cadastro de Transações</span></p>

                <div className='cadastro_transacao_container'>

                    <form className='cadastro_transacoes_form'>
                        <div className='inputs_form'>

                            <div className='input_descricao'>
                                <label htmlFor="descricao">Descrição da Transação</label>
                                <input
                                    id="descricao"
                                    type="text"
                                    name="descricao"
                                    placeholder='Ex: Celular'
                                    required
                                    value={descricaoTransacao}
                                    onChange={(e) => setDescricaoTransacao(e.target.value)}
                                />
                            </div>

                            <div className='input_categoria'>
                                <label htmlFor="categoria">Categoria</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    required
                                    value={categoriaTransacao}
                                    onChange={(e) => setCategoriaTransacao(e.target.value)}
                                >
                                    <option value="" disabled>Selecione uma categoria</option>
                                    <option value="ALIMENTACAO">Alimentação</option>
                                    <option value="TRANSPORTE">Transporte</option>
                                    <option value="MORADIA">Moradia</option>
                                    <option value="LAZER">Lazer</option>
                                    <option value="SALARIO">Salário</option>
                                    <option value="SAUDE">Saúde</option>
                                    <option value="OUTROS">Outros</option>
                                </select>
                            </div>

                            <div className='input_tipo'>
                                <label htmlFor="tipoTransacao">Tipo</label>
                                <select
                                    id="tipoTransacao"
                                    name="tipoTransacao"
                                    required
                                    value={tipoTransacao}
                                    onChange={(e) => setTipoTransacao(e.target.value)}
                                >
                                    <option value="" disabled>Selecione um tipo</option>
                                    <option value="ENTRADA">Entrada</option>
                                    <option value="SAIDA">Saída</option>
                                </select>
                            </div>

                            <div className='input_valor'>
                                <label htmlFor="valor">Valor</label>
                                <input
                                    id="valor"
                                    type="number"
                                    step="any"
                                    name="valor"
                                    placeholder='Ex: 1500,00'
                                    required
                                    value={valorTransacao}
                                    onChange={(e) => setValorTransacao(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="container_mensagem_cadastro_transacoes">
                            {success && <p className="mensagem_cadastro_sucesso">{success}</p>}
                            {error && <p className="mensagem_cadastro_erro">{error}</p>}
                        </div>

                        <div className='botoes_form'>
                            <button type='button' onClick={() => navigate("/transacoes")}>Cancelar</button>
                            <button type='button' onClick={handleCadastroTransacao}>Cadastrar Transação</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CadastroTransacao;