import express from 'express';
import requestLogger from './middlewares/request-logger.js';
import cors from 'cors';
import cvRoutes from './routes/cv-routes.js';


export default class Server {
    constructor(port = 3000){
        this.app = express();
        this.port = port;
        this.config();
        this.routes();
    }

    config(){
        this.app.use(requestLogger);
        this.app.use(express.static('public'));
        this.app.use(express.json()); //=> Conversion automatique du body en JSON
        this.app.use(cors()); //=> autorise les requêtes cross-origin (CORS)

    }


    routes(){
        // Tous les endpoints définis dans cv-routes.js seront préfixés par /api
        this.app.use('/api', cvRoutes);
       }

    start(callback){
        if(callback=== undefined){
            callback = () => console.log(`Serveur démarré sur http://localhost:${this.port}`);
        }
        this.app.listen(this.port, callback);

    }
}