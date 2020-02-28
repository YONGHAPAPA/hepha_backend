import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import UserCreateDTO from '../users/user.create.dto';
import UserLoginDTO from '../users/user.login.dto';
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
        this.router.post(`${this.path}/register`, validationDTOMiddleware(UserCreateDTO), this.register);
        this.router.post(`${this.path}/login`, validationDTOMiddleware(UserLoginDTO), this.login);
    }

    private register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const userCreateReqData: UserCreateDTO = req.body;

        try {
            const { user, cookieData } = await this.authenticationService.register(userCreateReqData);

            if(user) {
                res.setHeader('Set-Cookie', [cookieData]);
                res.send(user);
            }
        } catch(err) {
            next(err);
        }
    }

    private login = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
        const userLoginReqData: UserLoginDTO = req.body;

        try{ 
            const { user, cookieData } = await this.authenticationService.login(userLoginReqData);

            if(user) {
                res.setHeader('Set-Cookie', [cookieData]);
                res.send(user);
            }
        } catch(err) {
            next(err);
        }     
    }
}

export default AuthenticationController;