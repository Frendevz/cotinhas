import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Login from './pages/Login/Login';
import ResetPassword from './pages/Login/ResetPassword';
import Register from './pages/Login/Register';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  const user = useContext(AuthContext);

  const PrivateRoute = () => {
    if (!user) {
      return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  };

  const UnauthenticatedRoute = () => {
    if (user) {
      return <Navigate to="/home" />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route element={<UnauthenticatedRoute />}>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route
            path="/resetpassword"
            element={<ResetPassword />}
          ></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
