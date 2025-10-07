export interface IUserBase {
  first_name: string;
  last_name: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUser extends IUserBase {
  id: number;
  email: string;
}

export interface IUserSignUp extends IUserBase, IUserBase {}

export interface IUserUpdate extends IUserBase, Partial<IUserSignIn> {
  id: number;
}

export type AuthFormData = Partial<IUserBase> & IUserSignIn;
