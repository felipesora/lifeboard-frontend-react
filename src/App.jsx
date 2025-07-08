import './App.css'
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const showMenu = location.pathname !== '/' && location.pathname !== '/cadastro';

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
