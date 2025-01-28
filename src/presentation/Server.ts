import express, { Router } from "express";
import path from "path";


interface Options {
    port: number;
    public_path: string;
    routes: Router
}

/**
 * Server
 */
export class Server { 
    
    private app = express();

    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) { 
        const {  port, public_path = 'public', routes } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        //** Middlewares
        this.app.use(express.json()); //Raw
        //this.app.use(express.urlencoded({ extended: true })); //URL x-www-form-urlencoded
        //** Routes
        this.app.use(this.routes);
        //** Public folder
        this.app.use(express.static(this.publicPath));
        this.app.get('*', (request, response) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            response.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log("Server run on port 3000");
        });
    }
}