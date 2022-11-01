export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  email_verified: boolean;
  verify_token: string | null;
  provider: string;
  provider_id: string | null;
  password: string;
  password_reset_token: string | null;
  image: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface NewUserInterface {
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface UserInfoInterface {
  username: string;
  email: string;
  image: string | null;
  _id: string;
}
