import { signOut } from 'firebase/auth';
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from '../../AuthProvider';
import {
  createEvent,
  getEvents,
} from '../../controller/Event.controller';
import { EventData } from '../../models/Event.model';
import { auth } from '../../firebase/auth';
import { Container, Header } from './Home.styles';
import { getUserDebitBalance } from '../../controller/User.controller';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const DEFAULT_PICTURE_URL =
  'https://www.riobranco.ac.leg.br/imagens/pngtreeavatariconprofileiconmemberloginvectorisolatedpngimage_1978396.jpg/image';

function Row({ children }: { children?: ReactNode; name: string }) {
  return (
    <div className="row">
      <div className="row-content">{children}</div>
    </div>
  );
}

export default function Event() {
  const user = useContext(AuthContext);
  const [events, setEvents] = useState<EventData[]>([]);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    getEvents().then((eventos) => {
      setEvents(eventos);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    getUserDebitBalance({ id: user.uid }).then((events) => {});
  }, [user]);

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate('/' + path);
  };

  const handleCreateEvent = () => {
    if (!user) {
      return;
    }

    getEvents().then((eventos) => {
      setEvents(eventos);
    });
  };

  return (
    <>
      <Container>
        <Row name="header">
          <Header>
            <div className="column-left">
              <div className="circle picture">
                <img
                  src={user?.photoURL ?? DEFAULT_PICTURE_URL}
                  referrerPolicy="no-referrer"
                  alt="profile"
                ></img>
              </div>
            </div>
            <div className="column-right">
              <span>Olá,</span>
              <span className="username">
                {user?.displayName ?? 'Zé Coteiro'}
              </span>
            </div>
          </Header>
        </Row>
        <Row name="menu">Saldo: {saldo}</Row>
        <Row name="events">
          <Button
            onClick={() => {
              routeChange('event');
            }}
          >
            Eventos
          </Button>
          <Button
            onClick={() => {
              routeChange('profile');
            }}
          >
            Perfil
          </Button>
          <Button onClick={handleLogout}>Sair</Button>
        </Row>
        <Row name="actions"></Row>
      </Container>
    </>
  );
}
