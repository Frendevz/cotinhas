import { signOut } from "firebase/auth";
import { useCallback, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { auth } from "../../firebase/auth";

export default function Home() {
  const user = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  //if (!user) {
  //  return <Navigate to="/login" />;
  //}

  return (
    <>
      Você já está logado como <b>{user?.email}</b>.
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
