import { prisma } from '../utils/prisma.util.js';

export class UsersRepository {
  findUserById = async (id) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      }, // 비밀번호 제외
    });
  };
}
