import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import UserDto from '../users/user.dto';
import validationDTOMiddleware from '../middlewares/validationDto.middleware';
import AuthenticationService from './authentication.service';


class AuthenticationController implements Controller {
    
    public path = '/auth';
    public router = express.Router();
    private authenticationService = new AuthenticationService();

    constructor() {
        this.initailizeRoutes();
    }

    private initailizeRoutes() {
        this.router.post(`${this.path}/register`, validationDTOMiddleware(UserDto), this.register);
    }

    private register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const userData: UserDto = req.body;

        try {
            const { user, cookieData } = await this.authenticationService.register(userData);
            res.setHeader('Set-Cookie', [cookieData]);
            res.send(user);
        } catch(err) {
            next(err);
        }
    }
}

export default AuthenticationController;