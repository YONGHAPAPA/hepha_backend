import TokenData from './TokenData.interface'; 
import UserDataInToken from './UserDataInToken.interface';
import * as jwt from 'jsonwebtoken';

class CookieLib {

    public createCookie<T, K extends keyof T>(objData: T, properties: K[], expiresMiutes: number) {
        const expiresMinutes = 60 * expiresMiutes;
        const tokenData: TokenData = this.createToken(objData, properties);
        return `Authoriztion=${tokenData.token}; HttpOnly: Max-Age=${expiresMinutes};`;
    }

    public createToken<T, K extends keyof T>(objData: T, properties: K[]): TokenData {
        
        const secret = process.env.JWT_SECRET;
        const tokenData = {};

        properties.map((property) => { 
            //console.log(tokenData);
            return Object.assign(tokenData, { [property]: objData[property] });
        });

        return {
            expiresIn: 0, 
            token: jwt.sign(tokenData, secret)
        };
    }
}

export default CookieLib;
