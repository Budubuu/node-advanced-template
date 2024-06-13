import { ResumesRepository } from '../repositories/resumes.repository.js';

export class ResumesService {
    constructor() {
        this.resumesRepository = new ResumesRepository();
    }

    createResume = async (authorId, title, content) => {
        return this.resumesRepository.createResume(authorId, title, content);
    };

    getResumes = async (authorId, sort) => {
        if (sort !== 'desc' && sort !== 'asc') {
            sort = 'desc';
        }
        return this.resumesRepository.getResumes(authorId, sort);
    };

    getResumeById = async (authorId, id) => {
        return this.resumesRepository.getResumeById(authorId, id);
    };

    updateResume = async (authorId, id, title, content) => {
        return this.resumesRepository.updateResume(authorId, id, title, content);
    };

    deleteResume = async (authorId, id) => {
        return this.resumesRepository.deleteResume(authorId, id);
    };
}