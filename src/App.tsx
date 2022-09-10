import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import Login from './pages/Login/Login';
import ResetPassword from './pages/Login/ResetPassword';
import Register from './pages/Login/Register';
import Event from './pages/Event/Event';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PrivateRoute from './components/PrivateRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

function App() {
  const [redirectUrl, setRedirectUrl] = useState('/home');
  return (
    <>
      <Router>
        <Routes>
          <Route element={<UnauthenticatedRoute redirectUrl={redirectUrl} />}>
            <Route path='/' element={<Login />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Route>
          <Route path='/resetpassword' element={<ResetPassword />}></Route>
          <Route
            element={
              <PrivateRoute redirectUrl={[redirectUrl, setRedirectUrl]} />
            }
          >
            <Route path='/home' element={<Home />} />
            <Route path='/event' element={<Event />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
