export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  createDate: Date;
}

export interface DatabaseUserInterface {
  username: string;
  email: string;
  avatarUrl: string;
  _id: string;
}
