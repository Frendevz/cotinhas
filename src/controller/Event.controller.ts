import { EventData } from '../models/Event.model';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import db from '../firebase/db';
import { UserData } from '../models/User.model';

const col = collection(db, 'events') as CollectionReference<EventData>;

export const createEvent = async (data: EventData) => {
  await addDoc(col, data);
};

export const getEvents = async () => {
  const events = await getDocs(col);
  return events.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getEvent = async (id: EventData['id']) => {
  const docRef = doc(col, id);
  const docSnapshot = await getDoc(docRef);
  const eventDoc = { ...docSnapshot.data(), id: docSnapshot.id };

  return eventDoc;
};

export const addUser = async (eventProp: EventData, user: UserData['id']) => {
  const event = await getEvent(eventProp.id);
  if (event) {
    const eventMembers = event.members ?? [];
    eventMembers.push(user);
    event.members = eventMembers;
    const eventRef = doc(col, event.id);
    await setDoc(eventRef, event);
  }
};

export const removeUser = async (
  eventProp: EventData,
  user: UserData['id']
) => {
  const event = await getEvent(eventProp.id);
  if (event) {
    const eventMembers = event.members ?? [];
    const eventMembersWithoutUser = eventMembers.filter(
      (userId) => userId !== user
    );
    event.members = eventMembersWithoutUser;
    const eventRef = doc(col, event.id);
    await setDoc(eventRef, event);
  }
};

export const addTransaction = async (
  eventProp: DocumentSnapshot<EventData>,
  transaction: EventData['transactions'][0]
) => {
  const event = await getEvent(eventProp.id);
  if (event) {
    const eventTransactions = event.transactions ?? [];
    eventTransactions.push(transaction);
    event.transactions = eventTransactions;
    const eventRef = doc(col, event.id);
    await setDoc(eventRef, event);
  }
};

export const eventCol = col;
