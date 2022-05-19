import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages & Components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import { PrivateRoute } from './components/PrivateRoute';

import './App.css';



function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar />
          <Routes>
            <Route element={<PrivateRoute user={user} redirectPath='/login' />}>
              <Route path='/' element={<Home />} />
            </Route>


            <Route element={<PrivateRoute user={!user} redirectPath='/' />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Router>
      )}

    </div>
  );
}

export default App;
