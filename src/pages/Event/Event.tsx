import { Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ReactNode, useEffect, useState } from 'react';
import { eventCol } from '../../controller/Event.controller';
import { EventData } from '../../models/Event.model';
import { Container } from './Event.styles';
import { UserAddOutlined } from '@ant-design/icons';
import EventUsersModal from './EventUsersModal';
import CreateEventModal from './CreateEventModal';
import {
  DocumentReference,
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';

const f = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' })
  .format;

function Row({ children }: { children?: ReactNode; name: string }) {
  return (
    <div className='row'>
      <div className='row-content'>{children}</div>
    </div>
  );
}

export default function Event() {
  const [events, setEvents] = useState<QuerySnapshot<EventData> | null>(null);
  const [isUsersModalVisible, setUsersModalVisible] = useState(false);
  const [isCreateEventModalVisible, setCreateEventModalVisible] =
    useState(false);
  const [currentEvent, setCurrentEvent] =
    useState<DocumentReference<EventData> | null>(null);

  const showModal = (eventData: QueryDocumentSnapshot<EventData> | null) => {
    if (eventData) {
      setCurrentEvent(eventData.ref);
      setUsersModalVisible(true);
    }
  };

  const showModalCreateEvent = () => {
    setCreateEventModalVisible(true);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(eventCol, (colSnapshopt) => {
      setEvents(colSnapshopt);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const columns: ColumnType<QueryDocumentSnapshot<EventData>>[] = [
    {
      title: 'Nome',
      key: 'name',
      render(_, doc) {
        return doc.data().name;
      },
    },
    {
      title: 'Total',
      render(value, record) {
        return (
          <>
            {f(
              record
                .data()
                .transactions.reduce((acc, curr) => acc + curr.amount, 0)
            )}
          </>
        );
      },
      key: 'total',
    },
    {
      title: 'Membros',
      render(value, record) {
        return <>{record.data().members.length}</>;
      },
      key: 'members',
    },
    {
      title: 'Cota',
      render(value, record) {
        return (
          <>
            {f(
              record
                .data()
                .transactions.reduce((acc, curr) => acc + curr.amount, 0) /
                Math.max(record.data().members.length, 1)
            )}
          </>
        );
      },
      key: 'members',
    },
    {
      title: '',
      render(value, record) {
        return (
          <>
            <Button onClick={() => showModal(record)}>
              <UserAddOutlined />
            </Button>
          </>
        );
      },
      key: 'actions',
    },
  ];

  return (
    <>
      <EventUsersModal
        state={[isUsersModalVisible, setUsersModalVisible]}
        event={currentEvent}
      />
      <CreateEventModal
        state={[isCreateEventModalVisible, setCreateEventModalVisible]}
      />
      <Container>
        <Row name='header'>
          <h1>Eventos</h1>
        </Row>
        <Row name='header'>
          <Button onClick={showModalCreateEvent}>Criar evento</Button>
        </Row>
        <Row name='header'>
          <Table columns={columns} dataSource={events?.docs}></Table>
        </Row>
        <Row name='header'></Row>
      </Container>
    </>
  );
}
