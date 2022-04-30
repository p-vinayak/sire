import {compare, hash} from 'bcrypt';

// Hashes passwords with 8 salt rounds
export const hashPassword = async (password: string) => {
  return await hash(password, 8);
};

// Compares password and hashed password
export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  return await compare(password, hashedPassword);
};
