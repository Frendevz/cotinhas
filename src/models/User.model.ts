export enum PixType {
  CPF,
  CNPJ,
  EMAIL,
  ALEATORIA,
  TELEFONE,
}

type Timestamp = string;

export type UserData = {
  id: string;
  name: string;
  email: string;
  pix?: {
    type: PixType;
    value: string;
  };
  customPicture?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export default class User {
  id: UserData['id'];
  name: UserData['name'];
  email: UserData['email'];
  pix: UserData['pix'] | null = null;
  customPicture: UserData['customPicture'] | null = null;
  createdAt: UserData['createdAt'];
  updatedAt: UserData['updatedAt'];

  constructor(args: UserData) {
    this.id = args.id;
    this.name = args.name;
    this.email = args.email;
    this.pix = args.pix ?? null;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
