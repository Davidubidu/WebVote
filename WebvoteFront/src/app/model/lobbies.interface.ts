export interface ILobbies {
  id: string;
  name: string;
  password?: string;
  creatorId?: string;
  participants: string[];
}

export interface IBackLobbies {
  _id: string;
  lobbyName: string;
  password?: string;
  creatorId?: string;
  participants: string[];
}
