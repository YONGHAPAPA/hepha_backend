import HttpException from './HttpException';

class ServiceException extends HttpException {
    constructor(status, message) {
        super(status, `Server Error : ${message}`);
    }
}

export default ServiceException;
