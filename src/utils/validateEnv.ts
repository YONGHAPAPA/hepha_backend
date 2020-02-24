import { cleanEnv, str, port } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        MONGO_PASSWORD: str(), 
        MONGO_PATH: str(), 
        MONGO_USER: str(), 
        PORT: port(), 
        JWT_SECRET: str(), 
        TWO_FA_APP_NAME: str()
    });
}

export default validateEnv;
