import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import ControleFinanceiro from "../pages/ControleFinanceiro/ControleFinanceiro";
import Transacoes from "../pages/Transacoes/Transacoes";
import CadastroTransacao from "../pages/CadastroTransacao/CadastroTransacao";
import EditarTransacao from "../pages/EditarTransacao/EditarTransacao";
import Metas from "../pages/Metas/Metas";
import CadastroMeta from "../pages/CadastroMeta/CadastroMeta";
import EditarMeta from "../pages/EditarMeta/EditarMeta";
import Conta from "../pages/Conta/Conta";
import Kanban from "../pages/Kanban/Kanban";
import CadastroTarefa from "../pages/CadastroTarefa/CadastroTarefa";
import EditarTarefa from "../pages/EditarTarefa/EditarTarefa";
import MinhasTarefas from "../pages/MinhasTarefas/MinhasTarefas";
import Pomodoro from "../pages/Pomodoro/Pomodoro";

export const routes = createBrowserRouter([
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
  {
    path: '/editar-tarefa/:id',
    element: <EditarTarefa />
  },
  {
    path: '/minhas-tarefas',
    element: <MinhasTarefas />
  },
  {
    path: '/pomodoro',
    element: <Pomodoro />
  }
]);