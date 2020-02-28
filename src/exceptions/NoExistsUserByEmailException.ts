import HttpException from './HttpException';

class NoExistUserByEmailException extends HttpException {
    constructor(email: string) {
        super(401, `The user of '${email}' is not exists. please sign up for login.`);
    }
}

export default NoExistUserByEmailException;

