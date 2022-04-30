import prisma from '../database/client';

// Creates file entry of the saved file on the DB
export const save = async (
  file: Express.Multer.File & {relativePath: string; id: string},
  userId: string,
  title: string,
) => {
  const {filename: name, mimetype: mime, relativePath: path, size, id} = file;
  const createdFile = await prisma.file_metadata.create({
    data: {
      id,
      name,
      mime,
      owner: userId,
      path,
      size,
      title,
      created_at: new Date(),
    },
    select: {
      id: true,
      name: true,
      mime: true,
      size: true,
      title: true,
      created_at: true,
    },
  });
  return createdFile;
};

// Checks if a user can upload a file of a given size without violating storage limits
export const canUpload = async (userId: string, fileSize: bigint) => {
  const storageUsed = await getStorageUsed(userId); // Get storage used by user
  // Convert storage used to big int to prevent calculation errors
  const storageUsedBigInt = BigInt(storageUsed);
  const sum = BigInt(storageUsedBigInt + fileSize);
  // Check if user can upload given file
  if (sum > BigInt(1073741824)) return false;
  return true;
};

// Calculates the total storage used by a given user
export const getStorageUsed = async (userId: string) => {
  const storageUsed = (
    await prisma.file_metadata.aggregate({
      _sum: {size: true},
      where: {
        owner: userId,
      },
    })
  )._sum.size;
  if (storageUsed == null) return 0;
  return storageUsed;
};
