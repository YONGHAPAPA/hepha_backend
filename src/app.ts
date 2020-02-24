import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import Controller from './interfaces/controller.interface';


class App {

    public app: express.Application;
   
    constructor(controllers: Controller[]) {
        this.app = express();
        const { MONGO_PATH, PORT } = process.env;
        this.connectToDatabase(MONGO_PATH);
        this.initailzeMiddlewares();
        this.initializeControllers(controllers);
        this.listen(PORT);
    }

    private connectToDatabase(dbUri) {
        const options = {
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            useNewUrlParser: true
        };

        mongoose.connect(dbUri, options).catch((err) => { 
            console.log(`[connectToDatabase] error : ${err}`); 
        });
    }

    private initailzeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initializeControllers(controllers: any) {
        controllers.forEach((controller: any) => { 
            this.app.use('/', controller.router);
        });
    }

    private listen(portNum) {
        this.app.listen(portNum, () => {
            console.log(`This app listening on the port ${portNum}`);
        });
    }
}

export default App;