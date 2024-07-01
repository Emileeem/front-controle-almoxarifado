import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Salas from "./pages/Salas";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Salas />} />
      </Routes>
    </Router>
  )
}

export default App
