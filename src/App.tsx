import { signOut } from 'firebase/auth';
import { useCallback, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { auth } from './firebase/auth';
import Login from './pages/Login/Login';

function App() {
  const user = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <>
      Você já está logado como <b>{user.email}</b>.
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
