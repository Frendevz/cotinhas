import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Form, Wrapper } from './Login.styles';
import background from './background.jpg';
import Logo from '../../assets/logo.png';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/auth';

const GoogleProvider = new GoogleAuthProvider();

const ResetPassword : FC = () => {
  
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
