import prisma from '../database/client';

// Removes a file from DB, given its ID
export const removeFileByID = async (id: string) => {
  return await prisma.file_metadata.delete({where: {id: id}});
};

// Finds a file in DB, given its ID
export const findFileByID = async (id: string) => {
  const file = await prisma.file_metadata.findFirst({
    where: {id: id},
  });
  return file;
};

// Finds all files owned by a specific user
export const findAllFiles = async (userId: string) => {
  const files = await prisma.file_metadata.findMany({
    where: {owner: userId},
    select: {
      id: true,
      name: true,
      mime: true,
      size: true,
      title: true,
      created_at: true,
    },
  });
  return files;
};
