import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAHFgV44-KUdEkJUyZI3bQqlN1i_-UwBtU',
  authDomain: 'cocotinhas-358717.firebaseapp.com',
  projectId: 'cocotinhas-358717',
  storageBucket: 'cocotinhas-358717.appspot.com',
  messagingSenderId: '998963893404',
  appId: '1:998963893404:web:b3197bb993aacec45f0959',
  measurementId: 'G-EMLH0NH932',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
