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
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
