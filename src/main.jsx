import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login/Login.jsx'
import Cadastro from './routes/Cadastro/Cadastro.jsx'
import ControleFinanceiro from './routes/ControleFinanceiro/ControleFinanceiro.jsx'
import Transacoes from './routes/Transacoes/Transacoes.jsx'
import CadastroTransacao from './routes/CadastroTransacao/CadastroTransacao.jsx'
import EditarTransacao from './routes/EditarTransacao/EditarTransacao.jsx'
import Metas from './routes/Metas/Metas.jsx'
import CadastroMeta from './routes/CadastroMeta/CadastroMeta.jsx'
import EditarMeta from './routes/EditarMeta/EditarMeta.jsx'
import Conta from './routes/Conta/Conta.jsx'
import Kanban from './routes/Kanban/Kanban.jsx'
import CadastroTarefa from './routes/CadastroTarefa/CadastroTarefa.jsx'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/controle-financeiro',
    element: <ControleFinanceiro />,
  },
  {
    path: '/transacoes',
    element: <Transacoes />
  },
  {
    path: '/cadastrar-transacao',
    element: <CadastroTransacao />
  },
  {
    path: '/editar-transacao/:id',
    element: <EditarTransacao />
  },
  {
    path: '/metas',
    element: <Metas />
  },
  {
    path: '/cadastrar-meta',
    element: <CadastroMeta />
  },
  {
    path: '/editar-meta/:id',
    element: <EditarMeta />
  },
  {
    path: '/minha-conta',
    element: <Conta />
  },
  {
    path: '/tarefas-quadro-kanban',
    element: <Kanban />
  },
  {
    path: '/cadastrar-tarefa',
    element: <CadastroTarefa />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
