import {Request, Response, NextFunction} from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleWare(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'There is some issue from server side.';
    res.status(status).send({ status, message });
}

export default errorMiddleWare;