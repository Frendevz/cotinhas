import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Form, Wrapper } from './Login.styles';
import background from './background.jpg';
import Logo from '../../assets/logo.png';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { ValidEmail } from '../../components/ValidEmail';

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
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

    return true;
  }

  const handleEnter = useCallback(() => {
    if (validFields()) {
      sendPasswordResetEmail(auth, credentials.email)
        .then(() => {
          notification.success({
            message: 'E-mail enviado com sucesso',
          });
          navigate('/home');
        })
        .catch((err: any) => {
          notification.error({
            message:
              'Houve um problema enviar o e-mail, tente mais tarde',
          });
          console.log(err);
        });
    }
  }, [credentials]);

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

          <button onClick={handleEnter}>Resetar Senha</button>

          <span className="source">
            Made with ♥️ by{' '}
            <span className="company-name">FrenDevz 🐔</span>{' '}
          </span>
        </Form>
      </Wrapper>
    </>
  );
};

export default ResetPassword;
