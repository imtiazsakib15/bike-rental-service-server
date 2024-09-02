import bcrypt from 'bcrypt';

export const isPasswordMatch = async (
  password: string,
  hashedPassword: string,
) => await bcrypt.compare(password, hashedPassword);
