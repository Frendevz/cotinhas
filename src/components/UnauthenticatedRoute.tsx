import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

export default function UnauthenticatedRoute(props: { redirectUrl: string }) {
  const user = useContext(AuthContext);

  if (user) {
    return <Navigate to={props.redirectUrl} />;
  } else {
    return <Outlet />;
  }
}
