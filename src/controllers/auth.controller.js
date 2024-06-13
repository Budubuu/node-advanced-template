import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  signUp = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const data = await this.authService.signUp(email, password, name);
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (error) {
      if (error.message === 'EMAIL_DUPLICATED') {
        return res.status(HTTP_STATUS.CONFLICT).json({
          status: HTTP_STATUS.CONFLICT,
          message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
        });
      }
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const accessToken = await this.authService.signIn(email, password);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: { accessToken },
      });
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
        });
      }
      next(error);
    }
  };
}
