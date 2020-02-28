import HttpException from './HttpException';

class WrongCredentialsExceptions extends HttpException {
    constructor() {
        super(401, 'Wrong credentials provided.');
    }
}

export default WrongCredentialsExceptions;
