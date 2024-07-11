import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

// import Salas from "./pages/Salas";
import Funcionarios from './pages/AdicionarFuncionarios/Funcionarios';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Funcionarios />} />
      </Routes>
    </Router>
  )
}

export default App
