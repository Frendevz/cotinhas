import { Button, Input, Modal, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useEffect, useMemo, useState } from 'react';
import { addUser, removeUser } from '../../controller/Event.controller';
import { getUsers } from '../../controller/User.controller';
import { EventData } from '../../models/Event.model';
import { UserData } from '../../models/User.model';

export default function EventUsersModal(props: {
  state: [boolean, Function];
  event: EventData | null;
}) {
  const [open, setOpen] = props.state;
  const [users, setUsers] = useState<UserData[]>([]);
  const usersInEvent = props.event?.members ?? [];

  const handleOk = () => {};

  const handleCancel = () => {
    setOpen(false);
  };

  const handleUser = (user: UserData['id'], bRemove: boolean) => {
    const method = bRemove ? removeUser : addUser;
    if (props.event) {
      method(props.event, user);
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

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
    })();
  }, []);

  return (
    <Modal
      visible={open}
      title={`Usuários do evento ${props.event?.name}`}
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
        <Table dataSource={users} columns={columns} />
      </Space>
    </Modal>
  );
}
