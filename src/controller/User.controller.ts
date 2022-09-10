import { PixType, UserData } from '../models/User.model';
import {
  collection,
  doc,
  CollectionReference,
  setDoc,
  query,
  getDocs,
  where,
  collectionGroup,
} from 'firebase/firestore';
import db from '../firebase/db';
import { EventData } from '../models/Event.model';

const B_USE_MOCK = false;

const MOCK: UserData[] = [
  {
    createdAt: (Date.now() - 1000 * 60 * 60 * 24 * 8).toString(),
    name: 'Mark Zuckerberg',
    email: 'm.zuckerberg@gmail.com',
    id: '1',
    updatedAt: (Date.now() - 1000 * 60 * 60 * 24 * 1).toString(),
    pix: {
      type: PixType.EMAIL,
      value: 'm.zuckerberg@gmail.com',
    },
  },
  {
    createdAt: (Date.now() - 1000 * 60 * 60 * 24 * 3).toString(),
    name: 'Jeff Bezos',
    email: 'j.bezos@gmail.com',
    id: '2',
    updatedAt: (Date.now() - 1000 * 60 * 60 * 24 * 2).toString(),
    pix: {
      type: PixType.EMAIL,
      value: 'j.bezos@gmail.com',
    },
  },
  {
    createdAt: (Date.now() - 1000 * 60 * 60 * 24 * 24).toString(),
    name: 'Patrícia',
    email: 'patriciag@gmail.com',
    id: '3',
    updatedAt: (Date.now() - 1000 * 60 * 60 * 24 * 24).toString(),
    pix: {
      type: PixType.EMAIL,
      value: 'patriciag@gmail.com',
    },
  },
  {
    createdAt: (Date.now() - 1000 * 60 * 60 * 24 * 15).toString(),
    name: 'Bolsonaro Jair',
    email: 'j.bolsonaro@gmail.com',
    id: '4',
    updatedAt: (Date.now() - 1000 * 60 * 60 * 24 * 13).toString(),
    pix: {
      type: PixType.EMAIL,
      value: 'j.bolsonaro@gmail.com',
    },
  },
];

const col = collection(db, 'users') as CollectionReference<UserData>;
const eventCollection = collection(
  db,
  'events'
) as CollectionReference<EventData>;
const transactionCollections = collectionGroup(db, 'transactions');

export const onUserCreated = (userFromAuth: UserData): void => {
  setDoc(doc(col, userFromAuth.id), userFromAuth);
};

export const getUserDebitBalance = async (user: { id: string }) => {
  const q = query(transactionCollections, where('authorId', '==', user.id));
  const data = (await getDocs(q)).docs.map((doc) => doc.data());

  console.log('🟢', data);

  return data;
};

export const getUsers = async () => {
  const q = query(col);
  const data = (await getDocs(q)).docs.map((doc) => doc.data());

  return data;
};
