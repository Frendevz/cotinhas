import { createContext, ReactNode, useEffect, useState } from 'react';
import firebase from 'firebase/auth';
import { UserData } from '../models/User.model';
import {
  collection,
  CollectionReference,
  onSnapshot,
} from 'firebase/firestore';
import db from '../firebase/db';

export const UserContext = createContext<UserData[] | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData[] | null>(null);

  useEffect(() => {
    onSnapshot(
      collection(db, 'users') as CollectionReference<UserData>,
      (data) => {
        setUser(data.docs.map((doc) => doc.data()));
      }
    );
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
