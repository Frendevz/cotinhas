import { Button, Drawer, Table, Modal } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ReactNode, useEffect, useState } from 'react';
import { getEvents } from '../../controller/Event.controller';
import { EventData } from '../../models/Event.model';
import { Container } from './Event.styles';
import { UserAddOutlined } from '@ant-design/icons';
import EventUsersModal from './EventUsersModal';

function Row({ children }: { children?: ReactNode; name: string }) {
  return (
    <div className='row'>
      <div className='row-content'>{children}</div>
    </div>
  );
}

export default function Event() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isUsersModalVisible, setUsersModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);

  const showModal = (eventData: EventData) => {
    setCurrentEvent(eventData);
    setUsersModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      setEvents(await getEvents());
    })();
  }, []);

  const columns: ColumnType<EventData>[] = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total',
      render(value, record) {
        return (
          <>{record.transactions.reduce((acc, curr) => acc + curr.amount, 0)}</>
        );
      },
      key: 'total',
    },
    {
      title: 'Membros',
      render(value, record) {
        return <>{record.members.length}</>;
      },
      key: 'members',
    },
    {
      title: 'Cota',
      render(value, record) {
        return (
          <>
            {record.transactions.reduce((acc, curr) => acc + curr.amount, 0) /
              Math.max(record.members.length, 1)}
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
      <Container>
        <Row name='header'>
          <h1>Eventos</h1>
        </Row>
        <Row name='header'>
          <Button>Criar evento</Button>
        </Row>
        <Row name='header'>
          <Table columns={columns} dataSource={events}></Table>
        </Row>
        <Row name='header'></Row>
      </Container>
    </>
  );
}
