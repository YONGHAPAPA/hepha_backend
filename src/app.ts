import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import Controller from './interfaces/controller.interface';
import errorMiddleWare from './middlewares/error.middleware';
import { threadId } from 'worker_threads';


class App {

    public app: express.Application;
   
    constructor(controllers: Controller[]) {
        this.app = express();
        //const { MONGO_PATH, PORT } = process.env;
        const MONGO_PATH = process.env.MONGO_PATH;
        const PORT = process.env.PORT || 3000;
        
        this.connectToDatabase(MONGO_PATH);
        this.initailzeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeCustomHandler(); //middleware 로딩순서가 controller 순서보다 먼저되면 해당 middleware 수행안됨....why...
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

    private initializeCustomHandler() {
        this.app.use(errorMiddleWare);
    }

    private initializeControllers(controllers: any) {
        controllers.forEach((controller: any) => { 
            this.app.use('/', controller.router);
        });
    }

    private listen(port) {
        this.app.listen(port, () => {
            console.log(`This app listening on the port ${port}`);
        });
    }
}

export default App;