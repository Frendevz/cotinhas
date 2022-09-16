import { Button, Input, Modal, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import {
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from 'firebase/firestore';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import { addUser, removeUser } from '../../controller/Event.controller';
import { EventData } from '../../models/Event.model';
import { UserData } from '../../models/User.model';

export default function EventUsersModal(props: {
  state: [boolean, Function];
  event: DocumentReference<EventData> | null;
}) {
  const [open, setOpen] = props.state;
  const [event, setEvent] = useState<DocumentSnapshot<EventData> | null>(null);

  useEffect(() => {
    const unsubscribe = props.event && onSnapshot(props.event, setEvent);
    return () => {
      unsubscribe?.();
    };
  }, [props.event]);

  const users = useContext(UserContext);

  const usersInEvent = useMemo(() => event?.data()?.members ?? [], [event]);

  const handleOk = () => {};

  const handleCancel = () => {
    setOpen(false);
  };

  const handleUser = useCallback(
    (user: UserData['id'], bRemove: boolean) => {
      const method = bRemove ? removeUser : addUser;
      const data = event?.data();
      if (event && data) {
        data.id = event.id;
        method(data, user);
      }
    },
    [event]
  );

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
  }, [usersInEvent, handleUser]);

  return (
    <Modal
      visible={open}
      title={`Usuários do evento ${event?.data()?.name}`}
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
