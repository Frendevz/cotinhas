import { Button, Input, Modal, Space, Table } from 'antd';
import { useCallback, useState } from 'react';
import { createEvent } from '../../controller/Event.controller';
import { notification } from 'antd';

export default function CreateEventModal(props: {
  state: [boolean, Function];
}) {
  const [open, setOpen] = props.state;
  const [nameEvent, setNameEvent] = useState<string>('');
  const [descriptionEvent, setDescriptionEventEvent] =
    useState<string>('');

  const handleOk = () => {
    createEvent({
      createdAt: Date.now().toString(),
      id: '',
      description: descriptionEvent,
      members: [],
      name: nameEvent,
      pictureURL: null,
      transactions: [],
      updatedAt: Date.now().toString(),
    }).then(() => {
      setOpen(false);
      notification.success({
        message: `Evento ${nameEvent} criado com sucesso`,
      });
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Adicionar
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: `100%` }}>
        <label>Criar novo evento</label>
        <Input
          placeholder="Nome do evento"
          onChange={(e) => {
            setNameEvent(e.target.value);
          }}
        />
        <Input
          placeholder="Descrição do evento"
          onChange={(e) => {
            setDescriptionEventEvent(e.target.value);
          }}
        />
      </Space>
    </Modal>
  );
}
