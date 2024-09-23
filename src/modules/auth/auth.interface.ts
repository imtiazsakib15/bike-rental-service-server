export interface ILoginUser {
  email: string;
  password: string;
}

export interface IJwtPayload {
  email: string;
  role: string;
}
