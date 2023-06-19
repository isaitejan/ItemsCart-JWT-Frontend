import './App.css';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import SignupForm from './components/SignupForm';
import { useUserContext } from './hooks/useUserContext';

function App() {

  const { user } = useUserContext();
  
  return (
    <div className="App">
      {/* <LoginForm /> */}
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <LoginForm /> : <Navigate to='/' />} />
          <Route path='/signup' element={!user ? <SignupForm /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
