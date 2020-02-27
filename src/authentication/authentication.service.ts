import userModel from '../users/user.model';
import userDTO from '../users/user.dto';
import UserWithEmailAlreadyExistsException from '../exceptions/UserWithEmailAlreadyExistsException';
import * as bcryptjs from 'bcryptjs';
import User from '../users/user.interface';
import UserDataInToken from './cookies/UserDataInToken.interface';
import TokenData from './cookies/TokenData.interface';
import * as jwt from 'jsonwebtoken';
import CookieLib from './cookies/cookie.lib';

class AuthenticationService {

    private user = userModel;
    private cookieLib = new CookieLib();


    public async register(userData: userDTO) {
        if(await this.user.findOne({ email: userData.email })) {
            throw new UserWithEmailAlreadyExistsException(userData.email);
        }

        const hashedPassword = await bcryptjs.hash(userData.password, 10);
        const user = await this.user.create({ ...userData, password: hashedPassword });
        const cookieData = this.cookieLib.createCookie(user, ['email'], parseFloat(process.env.COOKIE_EXPIRE_TIME));

        return {
            user,
            cookieData
        };
    }


    
    // private createUserToken(user: User): TokenData {
    //     const expiresIn = 60 * 60;
    //     const secret = process.env.JWT_SECRET;
    //     const userDataInToken: UserDataInToken = { 
    //         name: user.name,
    //         email: user.email 
    //     };

    //     return {
    //         token: jwt.sign(userDataInToken, secret, { expiresIn }),
    //         expiresIn
    //     };
    // }
}

export default AuthenticationService;
