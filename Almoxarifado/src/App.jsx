import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Funcionarios from './pages/AdicionarFuncionarios/Funcionarios';
// import Salas from './pages/AdicionarSalas/Salas'

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
