import prisma from '../database/client';

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// Creates a user
export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const createdUser = await prisma.user.create({
    data: {username, email, password},
    select: {id: true, username: true, email: true},
  });
  return createdUser;
};

// Finds a user by their username
export const findByUsername = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {username},
    select: {id: true, username: true, email: true},
  });
  return user;
};

// Finds a user by their email
export const findByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {email},
    select: {id: true, username: true, email: true},
  });
  return user;
};
