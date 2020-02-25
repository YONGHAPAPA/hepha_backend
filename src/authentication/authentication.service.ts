import userModel from '../users/user.model';
import userDTO from '../users/user.dto';
import UserWithEmailAlreadyExistsException from '../exceptions/UserWithEmailAlreadyExistsException';
import * as bcryptjs from 'bcryptjs';
import User from '../users/user.interface';
import DataInToken from '../interfaces/DataInToken';
import TokenData from '../interfaces/TokenData'
import * as jwt from 'jsonwebtoken';

class AuthenticationService {

    private user = userModel;

    public async register(userData: userDTO) {
        if(await this.user.findOne({ email: userData.email })) {
            throw new UserWithEmailAlreadyExistsException(userData.email);
        }

        const hashedPassword = bcryptjs.hash(userData.password, process.env.PEPPER);
        const user = await this.user.create({ ...userData, password: hashedPassword });

        const tokenData = this.createUserToken(user);

        console.log(tokenData);

        return {
            user, 
            tokenData
        };
    }


    private createUserToken(user: User): TokenData {
        const expiresIn = 60 * 60;
        const secret = process.env.JWT_SECRET;
        const dataInToken: DataInToken = { email: user.email };

        return {
            token: jwt.sign(dataInToken, secret, { expiresIn }),
            expiresIn
        };
    }
}

export default AuthenticationService;
