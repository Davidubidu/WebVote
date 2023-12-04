export interface IUser {
  id: string;
  name: string;
  roles: string[];
  password: string;
}

export interface IBackUser {
  _id: string;
  name: string;
  roles: string[];
  password: string;
}
