import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/Create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/Update-todo.dto";
import { TodoRepository } from "../../domain/repository/Todo.repository";

const todos = [
    { id: 1, title: 'Buy milk', createdAt: new Date() },
    { id: 2, title: 'Buy bread', createdAt: null },
    { id: 3, title: 'Buy beer' , createdAt: new Date() },
]

export class TodosController {
    /**
     * 
     * @param todoRepository 
     */
    constructor(private readonly todoRepository: TodoRepository) { }
    
    /**Get TODOs
    * @returns Todo[]
    */
    public getTodos = async (request: Request, response: Response) => {
        const todos = await this.todoRepository.getAll();
        response.json(todos);
    }

    /**Get TODO by id
     * @param {number} id
     * @returns Todo
     */
    public getTodoById = async (request: Request, response: Response) => {
        const id = +request.params.id;
        if (isNaN(id)) {
            response.status(400).json({ error:'Invalid id is not a number' }); 
        }
        try {
            const todo = await this.todoRepository.getById(id);
            response.json(todo);
        } catch (error) {
            response.status(404).json(error);   
        }
    }

    /** Create TODO
     * @param CreateTodoDto
     * @returns Todo
     */
    public createTodo = async (request: Request, response: Response) => { 
        const [error, createTodoDto] = CreateTodoDto.create(request.body);
        try {
            const todo = await this.todoRepository.create(createTodoDto!);
            return response.json(todo);
        } catch (e) {
            return response.status(400).json({ error });
        }
    }

    /** Update TODO
     * @param {number} id
     * @param UpdateTodoDto
     * @returns Todo
     */
    public updateTodo = async (request: Request, response: Response) => { 
        const id = +request.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...request.body, id });
        if(error) {
            response.status(400).json({ error }); 
        }
            const updatedTodo = await this.todoRepository.update(updateTodoDto!);
            if (!updatedTodo) {
                response.status(404).json({ error:`Todo with id ${id} not found` });
            }
            const todoUpdated = await this.todoRepository.update(updateTodoDto!);
            response.json(todoUpdated);
    }

    /** Delete TODO
     * @param {number} id
     * @returns Todo           
     */
    public deleteTodo = async (request: Request, response: Response) => { 
        const id = +request.params.id;
        const deletedTodo = await this.todoRepository.delete(id);
        response.json(deletedTodo);
    }
}