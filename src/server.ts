/* eslint-disable import/extensions */
import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import AuthenticationController from './authentication/authentication.controller';

validateEnv();

const app = new App([
    new AuthenticationController(),
]);