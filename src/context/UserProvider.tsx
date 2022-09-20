import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { UserData } from '../models/User.model';
import {
  collection,
  CollectionReference,
  onSnapshot,
} from 'firebase/firestore';
import db from '../firebase/db';

export const UserContext = createContext<{
  users: UserData[] | null;
  getUserById: (id: UserData['id']) => UserData | null;
} | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserData[] | null>(null);

  const getUserById = useCallback(
    (id: UserData['id']) => {
      return users?.find((user) => user.id === id) ?? null;
    },
    [users]
  );

  useEffect(() => {
    onSnapshot(
      collection(db, 'users') as CollectionReference<UserData>,
      (data) => {
        setUsers(data.docs.map((doc) => doc.data()));
      }
    );
  }, []);

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};
