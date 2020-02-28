import userModel from '../users/user.model';
import userCreateDTO from '../users/user.create.dto';
import userLoginDTO from '../users/user.login.dto';
import UserWithEmailAlreadyExistsException from '../exceptions/UserWithEmailAlreadyExistsException';
import NoExistsUserByEmailException from '../exceptions/NoExistsUserByEmailException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import ServiceException from '../exceptions/ServiceExcpetion';
import * as bcryptjs from 'bcryptjs';
import User from '../users/user.interface';
import UserAuthenticationCookie from '../users/user.authentication.cookie.interface';
import * as jwt from 'jsonwebtoken';
import CookieLib from './cookies/cookie.lib';


class AuthenticationService {

    private user = userModel;
    private cookieLib = new CookieLib();

    public async register(userCreateData: userCreateDTO) {
        if(await this.user.findOne({ email: userCreateData.email })) {
            throw new UserWithEmailAlreadyExistsException(userCreateData.email);
        }

        const salt = await bcryptjs.genSalt(parseFloat(process.env.SALT_ROUND));
        const hashedPasword = await bcryptjs.hash(userCreateData.password, salt);
        const user = await this.user.create({ ...userCreateData, password: hashedPasword });
        
        const objUserForCookie: UserAuthenticationCookie = {
            _id: user._id,
            email: user.email,
        };

        const cookieData = await this.cookieLib.createCookie(objUserForCookie, parseFloat(process.env.COOKIE_EXPIRE_TIME));
                
        return {
            user,
            cookieData
        };
    }


    public async login(userLoginData: userLoginDTO) {
        const user = await this.user.findOne({ email: userLoginData.email });

        const objUserForCooke: UserAuthenticationCookie = {
            _id: null, 
            email: null
        };

        if(user) {
            const isMatched = await bcryptjs.compare(userLoginData.password, user.password);

            if(isMatched) {
                Object.assign(objUserForCooke, { _id: user._id, email: user.email });
                const cookieData = await this.cookieLib.createCookie(objUserForCooke, parseFloat(process.env.COOKIE_EXPIRE_TIME));

                return {
                    user, 
                    cookieData
                };
            } else {
                throw new WrongCredentialsException();
            }
        } else {
            throw new NoExistsUserByEmailException(userLoginData.email);
        }
    }
}

export default AuthenticationService;
