import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ListPengguna from './components/ListPengguna';
import CreatePengguna from './components/CreatePengguna';
import EditPengguna from './components/EditPengguna';

function App() {
  return (
    <div className='App'>
      <h3>React CRUD USING PHP API AND MySQL</h3>
   

    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">List Pengguna</Link>
          </li>
          <li>
            <Link to="pengguna/create">Create Pengguna</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<ListPengguna/>} />
        <Route path="pengguna/create" element={<CreatePengguna/>} />
        <Route path="pengguna/:id/edit" element={<EditPengguna/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
