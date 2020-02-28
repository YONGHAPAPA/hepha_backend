import * as jwt from 'jsonwebtoken';

interface TokenData {
    expiresIn: number, 
    token: string,
}

class CookieLib {

    public createCookie<T>(objData: T, expiresMiutes: number) {
        const expiresMinutes = 60 * expiresMiutes;
        const tokenData: TokenData = this.createToken(objData);
        return `Authoriztion=${tokenData.token}; HttpOnly: Max-Age=${expiresMinutes};`;
    }


    public createToken<T>(objForToken: T): TokenData {
        const secret = process.env.JWT_SECRET;
        const tokenData = {};
        const properties = Object.getOwnPropertyNames(objForToken);

        properties.map((property) => Object.assign(tokenData, { [property]: objForToken[property] }));

        return {
            expiresIn: 0, 
            token: jwt.sign(tokenData, secret)
        };
    }
}

export default CookieLib;
