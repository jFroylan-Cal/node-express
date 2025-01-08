import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

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
        const { title } = request.body;
        if (!title) {
            response.status(400).json({ error:'Title is required' });
        }

        const todo = await prisma.todo.create({
            data: {title},
        });

        response.json(todo);
    }

    public updateTodo = async (request: Request, response: Response) => { 
        const id = +request.params.id;
        if (isNaN(id)) {
            response.status(400).json({ error:'Invalid id is not a number' }); 
        }
        const { title } = request.body;
        if (!title) {
            response.status(400).json({ error:'Title is required' });
        }
        try {
            const todo = await prisma.todo.findUnique({
                where: { id },
            });

            await prisma.todo.update({
                where: { id },
                data: { title },
            });
            response.json(todo);
            
        } catch (error) {
            response.status(404).json({ error:`Todo with id ${id} not found` });
        }
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