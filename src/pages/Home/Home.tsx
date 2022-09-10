import { signOut } from 'firebase/auth';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider';
import { createEvent, getEvents } from '../../controller/Event.controller';
import { EventData } from '../../models/Event.model';
import { auth } from '../../firebase/auth';
import { Container, Header } from './Home.styles';
import { getUserDebitBalance } from '../../controller/User.controller';

const DEFAULT_PICTURE_URL =
  'https://www.riobranco.ac.leg.br/imagens/pngtreeavatariconprofileiconmemberloginvectorisolatedpngimage_1978396.jpg/image';

function Row({ children }: { children?: ReactNode; name: string }) {
  return (
    <div className='row'>
      <div className='row-content'>{children}</div>
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

  const handleCreateEvent = () => {
    if (!user) {
      return;
    }

    createEvent({
      createdAt: Date.now().toString(),
      description: 'Primeiro evento',
      id: 'idficticio',
      members: [],
      name: 'Teste',
      pictureURL: null,
      transactions: [
        {
          amount: 100,
          authorId: user.uid,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        },
      ],
      updatedAt: Date.now().toString(),
    });

    getEvents().then((eventos) => {
      setEvents(eventos);
    });
  };

  return (
    <>
      <Container>
        <Row name='header'>
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
        <Row name='menu'>Saldo: {saldo}</Row>
        <Row name='events'>
          {events.map((event) => (
            <>
              <div key={event.id}>{event.name}</div>
              <div>
                R${' '}
                {event.transactions.reduce((acc, curr) => acc + curr.amount, 0)}
              </div>
            </>
          ))}

          <button onClick={() => handleCreateEvent()}>Cria</button>
        </Row>
        <Row name='actions'></Row>
      </Container>
    </>
  );
}
