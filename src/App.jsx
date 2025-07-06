<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Registro from './pages/Registro';
import './style.css'; // Asegúrate de importar el CSS
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Registro from './pages/Registro';
>>>>>>> 8b9808952aa16ad877d622e65ad9c62c46edc353

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div className="app">
        <header className="navbar">
          <nav>
            <ul className="nav-list">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/todos">Todos</Link></li>
              <li><Link to="/registro">Registro</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
      </div>
=======
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
>>>>>>> 8b9808952aa16ad877d622e65ad9c62c46edc353
    </Router>
  );
}

export default App;
