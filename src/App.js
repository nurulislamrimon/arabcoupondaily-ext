import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Utilities/RequireAuth';

function App() {
  console.log(process.env.REACT_APP_apiKey);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          // <RequireAuth>
          <Home />
          // </RequireAuth>
        } />
        {/* <Route path='/login' element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;
