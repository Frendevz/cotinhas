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
import { Container, Header } from './Profile.styles';
import { getUserDebitBalance } from '../../controller/User.controller';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';
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

export default function Profile() {
  const user = useContext(AuthContext);

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
  };

  const { RangePicker } = DatePicker;
  const { TextArea } = Input;

  const FormDisabledDemo = () => {
    const [componentDisabled, setComponentDisabled] =
      useState<boolean>(true);
    const onFormLayoutChange = ({
      disabled,
    }: {
      disabled: boolean;
    }) => {
      setComponentDisabled(disabled);
    };
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
        <Row name="menu">
          <Button>Salvar</Button>
        </Row>
        <Row name="body">
          <Form layout="horizontal">
            <Form.Item label="Nome">
              <Input />
            </Form.Item>

            <Form.Item label="Email">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Tipo Chave PIX">
              <Select>
                <Select.Option value="CNPJ">CNPJ</Select.Option>
                <Select.Option value="CPF">CPF</Select.Option>
                <Select.Option value="EMAIL">EMAIL</Select.Option>
                <Select.Option value="TELEFONE">
                  TELEFONE
                </Select.Option>
                <Select.Option value="ALEATORIA">
                  ALEATORIA
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="PIX">
              <Input />
            </Form.Item>

            <Form.Item label="Foto Perfil" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>alterar foto</div>
                </div>
              </Upload>
            </Form.Item>
          </Form>
        </Row>
        <Row name="actions"></Row>
      </Container>
    </>
  );
}
