import { ResumesService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesController {
    constructor() {
        this.resumesService = new ResumesService();
    }

    createResume = async (req, res, next) => {
        try {
            const { title, content } = req.body;
            const authorId = req.user.id;
            const createdResume = await this.resumesService.createResume(authorId, title, content);
            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.RESUMES.CREATE.SUCCEED,
                data: createdResume,
            });
        } catch (error) {
            next(error);
        }
    };

    getResumes = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;
            const { sort } = req.query;
            const resumes = await this.resumesService.getResumes(authorId, sort);
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
                data: resumes,
            });
        } catch (error) {
            next(error);
        }
    };

    getResumeById = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;
            const { id } = req.params;
            const resume = await this.resumesService.getResumeById(authorId, id);
            if (!resume) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: HTTP_STATUS.NOT_FOUND,
                    message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
                });
            }
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
                data: resume,
            });
        } catch (error) {
            next(error);
        }
    };

    updateResume = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;
            const { id } = req.params;
            const { title, content } = req.body;
            const updatedResume = await this.resumesService.updateResume(authorId, id, title, content);
            if (!updatedResume) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: HTTP_STATUS.NOT_FOUND,
                    message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
                });
            }
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.UPDATE.SUCCEED,
                data: updatedResume,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteResume = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;
            const { id } = req.params;
            const deletedResume = await this.resumesService.deleteResume(authorId, id);
            if (!deletedResume) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: HTTP_STATUS.NOT_FOUND,
                    message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
                });
            }
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.DELETE.SUCCEED,
                data: { id: deletedResume.id },
            });
        } catch (error) {
            next(error);
        }
    };
}