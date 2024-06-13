import { UsersService } from '../services/user.service.js'; 
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class UsersController {
    constructor() {
        this.usersService = new UsersService();
    }

    getMe = async (req, res, next) => {
        try {
            const user = req.user;
            const data = await this.usersService.getUserById(user.id);

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.USERS.READ_ME.SUCCEED,
                data,
            });
        } catch (error) {
            next(error);
        }
    };
}