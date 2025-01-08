import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/Create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/Update-todo.dto";

const todos = [
    { id: 1, title: 'Buy milk', createdAt: new Date() },
    { id: 2, title: 'Buy bread', createdAt: null },
    { id: 3, title: 'Buy beer' , createdAt: new Date() },
]

export class TodosController {
    //* 
    constructor() {}
    //*Get TODOs
    public getTodos = async (request: Request, response: Response) => {
        const todos = await prisma.todo.findMany({
            orderBy: {
                id: 'desc',
            }
        });
        response.json(todos);
    }
    public getTodoById = async (request: Request, response: Response) => {
        const id = +request.params.id;
        if (isNaN(id)) {
            response.status(400).json({ error:'Invalid id is not a number' }); 
        }
        const todo = await prisma.todo.findUnique({
            where: { id },
        });
        if (todo) {
            response.json(todo);
        } else {
            response.status(404).json({ error:`Todo with id ${id} not found` });
        }
    }

    public createTodo = async (request: Request, response: Response) => { 
        const [error, createTodoDto] = CreateTodoDto.create(request.body);
        try {
            const todo = await prisma.todo.create({
                data: createTodoDto!,
            });
            response.json(todo);
        } catch (e) {
            response.status(400).json({ error });
        }
    }

    public updateTodo = async (request: Request, response: Response) => { 
        const id = +request.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...request.body, id });
        if(error) {
            response.status(400).json({ error });
        }
            const todo = await prisma.todo.findFirst({
                where: { id },
            });
            if (!todo) {
                response.status(404).json({ error:`Todo with id ${id} not found` });
            }
            const todoUpdated = await prisma.todo.update({
                where: { id },
                data: updateTodoDto!.values,
            });
            response.json(todoUpdated);
    }


    public deleteTodo = async (request: Request, response: Response) => { 
        const id = +request.params.id;
        if (isNaN(id)) {
            response.status(400).json({ error:'Invalid id is not a number' }); 
        }
        try {
            const todo = await prisma.todo.findUnique({
                where: { id },
            });
            await prisma.todo.delete({
                where: { id },
            });
            response.json(todo);
        } catch (error) {
            response.status(400).json({ error:`Todo with id ${id} not found` });
        }
    }
}