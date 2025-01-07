import { Router } from "express";
import { TodosController } from "./Controller";

export class TodoRoutes {
    static get routes() {
        const router = Router();
        const todosController = new TodosController();
        //** Routes
        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);
        return router;
    }
}