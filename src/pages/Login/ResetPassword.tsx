import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Form, Wrapper } from './Login.styles';
import background from './background.jpg';
import Logo from '../../assets/logo.png';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

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

  const handleEnter = useCallback(() => {
    sendPasswordResetEmail(auth, credentials.email)
      .then(() => {
        navigate('/home');
      })
      .catch((err: any) => {
        window.alert(err);
      });
  }, [credentials]);

  return (
    <>
      <Wrapper background={background}>
        <Form>
          <img src={Logo} alt='Cocotinhas' />
          <h1>ZÉ COTINHAS</h1>
          <input
            value={credentials.email}
            onChange={(e) => handleInput('email', e)}
            placeholder='Insira seu e-mail'
          ></input>

          <button onClick={handleEnter}>Resetar Senha</button>

          <span className='source'>
            Made with ♥️ by <span className='company-name'>FrenDevz 🐔</span>{' '}
          </span>
        </Form>
      </Wrapper>
    </>
  );
};

export default ResetPassword;
