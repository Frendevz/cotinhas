import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Form, Wrapper } from './Login.styles';
import background from './background.jpg';
import Logo from '../../assets/logo.png';
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { ValidEmail } from '../../components/ValidEmail';
import { notification } from 'antd';

const GoogleProvider = new GoogleAuthProvider();

const Register: FC = () => {
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

  const handleEnter = useCallback(() => {
    if (validFields()) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      ).catch((err: any) => {
        notification.error({
          message: 'Houve um problema ao registrar, tente mais tarde',
        });
        console.log(err);
      });
    }
  }, [credentials]);

  const handleGoogle = useCallback(() => {
    signInWithPopup(auth, GoogleProvider);
  }, []);

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
          <button onClick={handleEnter}>Cadastrar-se</button>

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

export default Register;
