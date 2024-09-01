import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
}
