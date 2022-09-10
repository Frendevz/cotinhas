import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

export default function PrivateRoute(props: {
  redirectUrl: [string, Function];
}) {
  const { pathname } = useLocation();
  const user = useContext(AuthContext);
  const [, setRedirectUrl] = props.redirectUrl;

  useEffect(() => {
    if (!user) {
      setRedirectUrl(pathname);
    }
  }, [user, pathname, setRedirectUrl]);

  if (!user) {
    return <Navigate to='/login' />;
  } else {
    return <Outlet />;
  }
}
