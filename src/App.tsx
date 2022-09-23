import { useState } from 'react';
import Login from './pages/Login/Login';
import ResetPassword from './pages/Login/ResetPassword';
import Register from './pages/Login/Register';
import Event from './pages/Event/Event';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import PrivateRoute from './components/PrivateRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Profile from './pages/profile/Profile';

function App() {
  const [redirectUrl, setRedirectUrl] = useState('/home');
  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <UnauthenticatedRoute redirectUrl={redirectUrl} />
            }
          >
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            element={
              <PrivateRoute
                redirectUrl={[redirectUrl, setRedirectUrl]}
              />
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
