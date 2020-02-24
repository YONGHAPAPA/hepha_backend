import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import UserDto from '../users/user.dto';

class AuthenticationController implements Controller {
    public path = '/auth';

    public router = express.Router();

    constructor() {
        this.initailizeRoutes();
    }

    private initailizeRoutes() {
        this.router.post(`${this.path}/register`, this.register);
    }

    private register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const userData: UserDto = req.body;
        console.log(userData);
    }
}

export default AuthenticationController;