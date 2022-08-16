import React, { ChangeEvent, FC, useCallback, useState } from 'react';
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
import ResetPassword from './ResetPassword';

const GoogleProvider = new GoogleAuthProvider();

const Login: FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInput = useCallback(
    (target: string, event: ChangeEvent<HTMLInputElement>) => {
      setCredentials((c) => ({ ...c, [target]: event.target.value }));
    },
    []
  );

  const handleEnter = useCallback(() => {
    signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    ).catch((err: any) => {
      window.alert('DEU ERRO AE PARÇA');
    });
  }, [credentials]);

  const handleGoogle = useCallback(() => {
    signInWithPopup(auth, GoogleProvider);
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
              clique aqui para inscrever-se
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
