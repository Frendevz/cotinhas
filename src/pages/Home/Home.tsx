import { signOut } from 'firebase/auth';
import { ReactNode, useCallback, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { auth } from '../../firebase/auth';
import { Container, Header } from './Home.styles';

const DEFAULT_PICTURE_URL =
  'https://www.riobranco.ac.leg.br/imagens/pngtreeavatariconprofileiconmemberloginvectorisolatedpngimage_1978396.jpg/image';

function Row({ children }: { children?: ReactNode }) {
  return (
    <div className='row'>
      <div className='row-content'>{children}</div>
    </div>
  );
}

export default function Home() {
  const user = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Header>
            <div className='column-left'>
              <div className='circle picture' onClick={handleLogout}>
                <img
                  src={user?.photoURL ?? DEFAULT_PICTURE_URL}
                  referrerPolicy='no-referrer'
                  alt='profile'
                ></img>
              </div>
            </div>
            <div className='column-right'>
              <span>Olá,</span>
              <span className='username'>
                {user?.displayName ?? 'Zé Coteiro'}
              </span>
            </div>
          </Header>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </Container>
    </>
  );
}
