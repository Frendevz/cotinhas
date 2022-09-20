import { Avatar, Button, Modal, Space, Table } from 'antd';
import {
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from 'firebase/firestore';
import { useContext, useEffect, useState, useMemo } from 'react';
import { EventData } from '../../models/Event.model';
import { AuthContext } from '../../AuthProvider';
import { UserContext } from '../../context/UserProvider';
import { groupBy } from '../../utils/ArrayUtils';

const f = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  .format;

export default function EventResumeModal(props: {
  state: [boolean, Function];
  event: DocumentReference<EventData> | null;
}) {
  const auth = useContext(AuthContext);
  const userProvider = useContext(UserContext);
  const [open, setOpen] = props.state;
  const [event, setEvent] = useState<DocumentSnapshot<EventData> | null>(null);

  useEffect(() => {
    const unsubscribe = props.event && onSnapshot(props.event, setEvent);
    return () => {
      unsubscribe?.();
    };
  }, [props.event]);

  const handleOk = () => {};
  const handleCancel = () => {
    setOpen(false);
  };

  const eventTotal = useMemo(() => {
    return event
      ?.data()
      ?.transactions.reduce((acc, curr) => acc + curr.amount, 0);
  }, [event]);

  const groupedData = useMemo(() => {
    const currEvent = event?.data();
    if (!currEvent) return [];

    const eventMembers = currEvent.members;
    const eventTransactions = currEvent.transactions;

    const memberAmount = eventMembers.map((member) => {
      return eventTransactions
        .filter((t) => t.authorId === member)
        .reduce(
          (acc, curr) => ({ ...curr, amount: curr.amount + acc.amount }),
          { amount: 0, authorId: '' }
        );
    });

    return memberAmount;
  }, [event]);

  return (
    <>
      <Modal
        visible={open}
        title={`Resumo do evento ${event?.data()?.name}`}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Fechar
          </Button>,
        ]}
      >
        <div>
          <Space>
            <span>
              <b>Total:</b> {f(eventTotal ?? 0)}
            </span>
            <span>
              <b>Cota:</b>{' '}
              {f((eventTotal ?? 0) / (event?.data()?.members.length ?? 1))}
            </span>
          </Space>
          <Table
            dataSource={groupedData}
            columns={[
              {
                render(_, record) {
                  const usersLength = event?.data()?.members.length ?? 1;
                  const cota = (eventTotal ?? 0) / usersLength;
                  const cotaPessoa = record.amount - cota;

                  const str = cotaPessoa > 0 ? 'recebe' : 'paga';
                  return (
                    <span style={{ color: cotaPessoa > 0 ? 'green' : `red` }}>
                      Usuário {str} {f(Math.abs(cotaPessoa))}.
                    </span>
                  );
                },
              },
              {
                render(_, record) {
                  return f(record.amount);
                },
              },
              {
                render(_, record) {
                  const user = userProvider?.getUserById(record.authorId);
                  return (
                    <span>
                      <Space>
                        <Avatar src={user?.customPicture} />
                        <span>{user?.name}</span>
                      </Space>
                    </span>
                  );
                },
              },
            ]}
          ></Table>
        </div>
      </Modal>
    </>
  );
}
