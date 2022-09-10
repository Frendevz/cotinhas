import type User from './User.model';

type Timestamp = string;
export type EventData = {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  name: string;
  description: string;
  members: User['id'][];
  pictureURL: string | null;

  transactions: {
    authorId: User['id'];
    amount: number;
    description?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }[];
};

export default class Event {
  id: EventData['id'];
  createdAt: EventData['createdAt'];
  updatedAt: EventData['updatedAt'];

  constructor(args: EventData) {
    this.id = args.id;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
