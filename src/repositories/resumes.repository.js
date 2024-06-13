import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
    createResume = async (authorId, title, content) => {
        return prisma.resume.create({
            data: {
                authorId,
                title,
                content,
            },
        });
    };

    getResumes = async (authorId, sort) => {
        const resumes = await prisma.resume.findMany({
            where: { authorId },
            orderBy: { createdAt: sort },
            include: { author: true },
        });

        return resumes.map(resume => ({
            id: resume.id,
            authorName: resume.author.name,
            title: resume.title,
            content: resume.content,
            status: resume.status,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        }));
    };

    getResumeById = async (authorId, id) => {
        const resume = await prisma.resume.findUnique({
            where: { id: parseInt(id), authorId },
            include: { author: true },
        });

        if (!resume) return null;

        return {
            id: resume.id,
            authorName: resume.author.name,
            title: resume.title,
            content: resume.content,
            status: resume.status,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        };
    };

    updateResume = async (authorId, id, title, content) => {
        const existedResume = await prisma.resume.findUnique({
            where: { id: parseInt(id), authorId },
        });

        if (!existedResume) return null;

        return prisma.resume.update({
            where: { id: parseInt(id), authorId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
            },
        });
    };

    deleteResume = async (authorId, id) => {
        const existedResume = await prisma.resume.findUnique({
            where: { id: parseInt(id), authorId },
        });

        if (!existedResume) return null;

        return prisma.resume.delete({
            where: { id: parseInt(id), authorId },
        });
    };
}