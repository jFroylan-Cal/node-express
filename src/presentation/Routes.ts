import { Router } from "express";
import { TodoRoutes } from "./todos/Routes";

export class AppRoutes {
    static get routes(): Router { 
        const router = Router();
                //** Routes
        router.use('/api/todos', TodoRoutes.routes);
        //TODO - Add more routes
        //Example
        //router.use('/api/users', UsersRouters.routes);
        return router;
    }
}