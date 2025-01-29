import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/Create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/Update-todo.dto";
import { TodoRepository } from "../../domain/repository/Todo.repository";
import { CreateTodo } from "../../domain/use-cases/todo/Create-todo";
import { DeleteTodo } from "../../domain/use-cases/todo/Delete-todo";
import { GetTodo } from "../../domain/use-cases/todo/Get-todo";
import { GetTodos } from "../../domain/use-cases/todo/Get-todos";
import { UpdateTodo } from "../../domain/use-cases/todo/Update-todo";

export class TodosController {
    /**
     * 
     * @param todoRepository 
     */
    constructor(private readonly todoRepository: TodoRepository) { }
    
    /**Get TODOs
    * @returns Todo[]
    */
    public getTodos =  (request: Request, response: Response) => {
        new GetTodos(this.todoRepository).execute()
            .then(todos => response.json(todos))
            .catch(error => response.status(400)
            .json({ error }));
    }

    /**Get TODO by id
     * @param {number} id
     * @returns Todo
     */
    public getTodoById = (request: Request, response: Response) => {
        const id = +request.params.id;
        new GetTodo(this.todoRepository).execute(id)
            .then(todo => response.json(todo))
            .catch(error => response.status(400)
            .json({ error }));
    }

    /** Create TODO
     * @param CreateTodoDto
     * @returns Todo
     */
    public createTodo = (request: Request, response: Response) => { 
        const [error, createTodoDto] = CreateTodoDto.create(request.body);
        if (error) {
            return response.status(400).json({ error });
        }
        new CreateTodo(this.todoRepository).execute(createTodoDto!)
            .then(todo => response.json(todo))
            .catch(error => response.status(400)
            .json({ error }));
    }

    /** Update TODO
     * @param {number} id
     * @param UpdateTodoDto
     * @returns Todo
     */
    public updateTodo = (request: Request, response: Response) => { 
        const id = +request.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...request.body, id });
        if (error) {
            response.status(400).json({ error });
        }
        new UpdateTodo(this.todoRepository).execute(updateTodoDto!)
            .then(todo => response.json(todo))
            .catch(error => response.status(400)
            .json({ error }));
    }

    /** Delete TODO
     * @param {number} id
     * @returns Todo           
     */
    public deleteTodo = (request: Request, response: Response) => {
        const id = +request.params.id;
        new DeleteTodo(this.todoRepository).execute(id)
            .then(todo => response.json(todo))
            .catch(error => response.status(400)
            .json({ error }));
    }
}