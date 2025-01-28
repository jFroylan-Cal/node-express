import { Router } from "express";
import { TodosController } from "./Controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasourcer/Todo.datasource.impl";

export class TodoRoutes {
    
    static get routes() {
        const router = Router();
        const dataSource = new TodoDatasourceImpl();
        const todoRepository = new TodoDatasourceImpl(dataSource);
        const todosController = new TodosController(todoRepository);
        //** Routes
        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);
        return router;
    }
}