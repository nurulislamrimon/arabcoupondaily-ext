import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Utilities/RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
