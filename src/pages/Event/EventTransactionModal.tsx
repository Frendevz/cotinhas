import {
  Avatar,
  Button,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
} from 'antd';
import {
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from 'firebase/firestore';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { EventData } from '../../models/Event.model';
import moment from 'moment';
import { AuthContext } from '../../AuthProvider';
import { addTransaction } from '../../controller/Event.controller';
import { UserContext } from '../../context/UserProvider';

const dateFormat = 'DD-MM-YYYY';

export default function EventTransactionModal(props: {
  state: [boolean, Function];
  event: DocumentReference<EventData> | null;
}) {
  const auth = useContext(AuthContext);
  const userProvider = useContext(UserContext);
  const [open, setOpen] = props.state;
  const [event, setEvent] = useState<DocumentSnapshot<EventData> | null>(null);
  const [transaction, setTransaction] = useState({
    description: '',
    amount: 0,
    date: Date.now(),
    authorId: auth?.uid,
  });

  useEffect(() => {
    const unsubscribe = props.event && onSnapshot(props.event, setEvent);
    return () => {
      unsubscribe?.();
    };
  }, [props.event]);

  const handleOk = () => {
    if (event) {
      addTransaction(event, {
        ...transaction,
        authorId: transaction.authorId ?? 'Unknown',
        createdAt: transaction.date.toString(),
        updatedAt: transaction.date.toString(),
      }).then(() => {
        setTransaction({
          description: '',
          amount: 0,
          date: Date.now(),
          authorId: auth?.uid,
        });
      });
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleAmount = (value: number) => {
    setTransaction((t) => ({ ...t, amount: value }));
  };

  const handleDescription = (value: ChangeEvent<HTMLInputElement>) => {
    setTransaction((t) => ({ ...t, description: value.target.value }));
  };

  const handleDate = (value: moment.Moment | null) => {
    setTransaction((t) => ({
      ...t,
      date: value?.toDate().getTime() || Date.now(),
    }));
  };

  return (
    <>
      <Modal
        visible={open}
        title={`Transações do evento ${event?.data()?.name}`}
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
        <div>
          <Space direction='vertical'>
            <Space style={{ width: `100%` }}>
              <Input
                value={transaction.description}
                placeholder='Descrição'
                onChange={handleDescription}
              />
              <InputNumber
                defaultValue={transaction.amount}
                value={transaction.amount}
                onChange={handleAmount}
                style={{ width: `100%` }}
              />
              <DatePicker
                onChange={handleDate}
                defaultValue={moment(new Date(), dateFormat)}
              />
            </Space>
            <Table
              dataSource={event?.data()?.transactions}
              columns={[
                { dataIndex: 'description' },
                { dataIndex: 'amount' },
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
          </Space>
        </div>
      </Modal>
    </>
  );
}
