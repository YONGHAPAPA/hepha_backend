import * as express from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import HttpException from '../exceptions/HttpException';


function validationDTOMiddleware<T>(cls: ClassType<T>, skipMissingProperties = false): express.RequestHandler {
    return (req, res, next) => {
        //const classTransformOptions = { skipMissingProperties: false }; 
        validate(plainToClass(cls, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
            if(errors.length > 0) {
                const errorMessage = errors.map((err: ValidationError) => Object.values(err.constraints)).join(', ');
                next(new HttpException(400, errorMessage));
            } else {
                next();
            }
        });
    };
}

export default validationDTOMiddleware;

