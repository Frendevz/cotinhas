import { Button, Input, Modal, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import {
  collection,
  CollectionReference,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import { addUser, removeUser } from '../../controller/Event.controller';
import { getUsers } from '../../controller/User.controller';
import db from '../../firebase/db';
import { EventData } from '../../models/Event.model';
import { UserData } from '../../models/User.model';

export default function EventUsersModal(props: {
  state: [boolean, Function];
  event: EventData | null;
}) {
  const [open, setOpen] = props.state;
  const [event, setEvent] = useState<EventData | null>(null);

  useEffect(() => {
    let unsubscribeDoc = () => {};
    if (props.event) {
      const eventCol = collection(
        db,
        'events'
      ) as CollectionReference<EventData>;
      const eventDoc = doc<EventData>(eventCol, `${props.event.id}`);
      unsubscribeDoc = onSnapshot(eventDoc, (doc) => {
        const data = doc.data() ?? null;
        if (data) {
          data.id = doc.id;
        }
        setEvent(data);
      });
    }

    return () => {
      unsubscribeDoc();
    };
  }, [props.event]);

  console.log(props.event);

  const users = useContext(UserContext);

  const usersInEvent = event?.members ?? [];

  const handleOk = () => {};

  const handleCancel = () => {
    setOpen(false);
  };

  const handleUser = (user: UserData['id'], bRemove: boolean) => {
    const method = bRemove ? removeUser : addUser;
    if (event) {
      method(event, user);
    }
  };

  const columns = useMemo(() => {
    const columns: ColumnType<UserData>[] = [
      {
        title: 'Nome do usuário',
        dataIndex: 'name',
      },
      {
        align: 'right',
        render(value, record) {
          return (
            <>
              <Button
                onClick={() =>
                  handleUser(record.id, usersInEvent.includes(record.id))
                }
              >
                {usersInEvent.includes(record.id) ? 'Remover' : 'Adicionar'}
              </Button>
            </>
          );
        },
      },
    ];

    return columns;
  }, [usersInEvent]);

  return (
    <Modal
      visible={open}
      title={`Usuários do evento ${event?.name}`}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          Adicionar
        </Button>,
      ]}
    >
      <Space direction='vertical' style={{ width: `100%` }}>
        <span>{usersInEvent.join(',')}</span>
        <Input />
        <Table dataSource={users ?? []} columns={columns} />
      </Space>
    </Modal>
  );
}
