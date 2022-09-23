import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Form, Wrapper } from './Login.styles';
import background from './background.jpg';
import Logo from '../../assets/logo.png';
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { notification } from 'antd';
import { ValidEmail } from '../../utils/ValidEmail';
import { onUserCreated } from '../../controller/User.controller';

const GoogleProvider = new GoogleAuthProvider();

const Login: FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  function validFields(): boolean {
    if (
      credentials.email == null ||
      credentials.email == '' ||
      !ValidEmail(credentials.email)
    ) {
      notification.error({
        message: 'Informe um e-mail válido',
      });
      return false;
    }

    if (
      credentials.password == null ||
      credentials.password == '' ||
      credentials.password.length < 6
    ) {
      notification.error({
        message:
          'Informe uma senha válida com no minimo 6 caracteres',
      });
      return false;
    }

    return true;
  }

  const handleInput = useCallback(
    (target: string, event: ChangeEvent<HTMLInputElement>) => {
      setCredentials((c) => ({ ...c, [target]: event.target.value }));
    },
    []
  );

  const handleEnter = useCallback(() => {
    if (validFields()) {
      signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then(({ user }) => {
          notification.success({
            message: 'Logado com sucesso',
          });
          onUserCreated({
            createdAt:
              user.metadata.creationTime ?? Date.now().toString(),
            updatedAt: Date.now().toString(),
            name: user.displayName ?? 'Sem nome',
            id: user.uid,
            email: user.email ?? 'Sem email',
            customPicture: user.photoURL ?? '',
          });
        })
        .catch((err: any) => {
          notification.error({
            message:
              'Não foi possível fazer o login, tente mais tarde',
          });
          console.log(err);
        });
    }
  }, [credentials]);

  const handleGoogle = useCallback(() => {
    signInWithPopup(auth, GoogleProvider)
      .then(({ user }) => {
        notification.success({
          message: 'Logado com sucesso',
        });
        onUserCreated({
          createdAt: user.metadata.creationTime
            ? new Date(user.metadata.creationTime)
                .getTime()
                .toString()
            : Date.now().toString(),
          updatedAt: Date.now().toString(),
          name: user.displayName ?? 'Sem nome',
          id: user.uid,
          email: user.email ?? 'Sem email',
          customPicture: user.photoURL ?? '',
        });
      })
      .catch(() => {
        notification.error({
          message: 'Houve um erro, tente novamente mais tarde',
        });
      });
  }, []);

  //return (
  //<>

  //    Você já está logado como <b>{user.email}</b>.
  //    <button onClick={handleLogout}>Logout</button>
  //  </>
  //);

  return (
    <>
      <Wrapper background={background}>
        <Form>
          <img src={Logo} alt="Cocotinhas" />
          <h1>ZÉ COTINHAS</h1>
          <input
            value={credentials.email}
            onChange={(e) => handleInput('email', e)}
            placeholder="Insira seu e-mail"
          ></input>
          <input
            type="password"
            autoComplete={'false'}
            value={credentials.password}
            onChange={(e) => handleInput('password', e)}
            placeholder="Insira sua senha"
          ></input>
          <button onClick={handleEnter}>Entrar</button>
          <span>
            ou{' '}
            <span className="link">
              <a href="/register">clique aqui para inscrever-se</a>
            </span>
          </span>
          <span>
            <span className="link white">
              <a href="/resetpassword">Esqueci minha senha</a>
            </span>
          </span>
          <div className="social-options">
            <span
              onClick={handleGoogle}
              className="social-icon google"
            >
              <GoogleOutlined />
            </span>
            <span className="social-icon google">
              <FacebookFilled />
            </span>
          </div>
          <span className="source">
            Made with ♥️ by{' '}
            <span className="company-name">FrenDevz 🐔</span>{' '}
          </span>
        </Form>
      </Wrapper>
    </>
  );
};

export default Login;
