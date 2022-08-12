import { GoogleAuthProvider, signOut } from 'firebase/auth';
import { Component, ReactNode, useCallback, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { auth } from './firebase/auth';
import Login from './pages/Login/Login';
import ResetPassword from './pages/Login/ResetPassword';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  const user = useContext(AuthContext);

  console.log('Email:' + user?.email);
  console.log('User:' + user);

  const PrivateRoutes = () => {
    if (user) {
      return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/resetpassword"
            element={<ResetPassword />}
          ></Route>
          <Route path="/home" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
