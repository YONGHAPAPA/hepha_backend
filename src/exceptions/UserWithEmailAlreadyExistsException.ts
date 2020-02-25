/* eslint-disable import/extensions */
import HttpException from './HttpException';

class UserWithEmailAlreadyExistsException extends HttpException {
    constructor(email: string) {
        super(400, `User with email ${email} is already exists`);
    }
}

export default UserWithEmailAlreadyExistsException;
