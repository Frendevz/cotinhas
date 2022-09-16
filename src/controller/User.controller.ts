import { UserData } from '../models/User.model';
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

const col = collection(db, 'users') as CollectionReference<UserData>;
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
