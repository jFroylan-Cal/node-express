import { Request, Response } from "express";

const todos = [
    { id: 1, title: 'Buy milk', createdAt: new Date() },
    { id: 2, title: 'Buy bread', createdAt: null },
    { id: 3, title: 'Buy beer' , createdAt: new Date() },
]

export class TodosController {
    //* 
    constructor() {}
    //*Get TODOs
    public getTodos = (request: Request, response: Response) => {
        response.json(todos);
    }
    public getTodoById = (request: Request, response: Response) => {
        const id = +request.params.id;
        if (isNaN(id)) {
            response.status(400).json({ error:'Invalid id is not a number' }); 
        }
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            response.json(todo);
        } else {
            response.status(404).json({ error:`Todo with id ${id} not found` });
        }
    }

    public createTodo = (request: Request, response: Response) => { 
        const { title } = request.body;
        if (!title) {
            response.status(400).json({ error:'Title is required' });
        }
        const newTodo = { id: todos.length + 1, title, createdAt: new Date() };
        todos.push(newTodo);
        response.json(newTodo);
    }

    public updateTodo = (request: Request, response: Response) => { 
        const id = +request.params.id;
        if (isNaN(id)) {
            response.status(400).json({ error:'Invalid id is not a number' }); 
        }
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            const { title } = request.body;
            if (!title) {
                response.status(400).json({ error:'Title is required' });
            }
            todo.title = title;
            response.json(todo);
        } else {
            response.status(404).json({ error:`Todo with id ${id} not found` });
        }
        response.json();
    }


    public deleteTodo = (request: Request, response: Response) => { 
        const id = +request.params.id;
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            todos.splice(todos.indexOf(todo), 1);
            response.json(todo);
        } else {
            response.status(404).json({ error:`Todo with id ${id} not found` });
        }
    }
}