import { prisma } from '../utils/prisma.util.js';

export class AuthRepository {
    findUserByEmail = async (email) => {
        return prisma.user.findUnique({ where: { email } });
    };

    createUser = async (email, password, name) => {
        const user = await prisma.user.create({
            data: { email, password, name },
        });
        user.password = undefined; // 비밀번호를 응답에서 제외
        return user;
    };
}