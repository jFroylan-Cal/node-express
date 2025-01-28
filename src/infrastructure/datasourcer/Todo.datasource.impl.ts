

import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain/datasources/Todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/Create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/Update-todo.dto";
import { TodoEntity } from "../../domain/entities/Todo.entity";

export class TodoDatasourceImpl implements TodoDatasource {

    /**
     * 
     * @param createTodoDto 
     * @returns 
     */
    async create(createTodoDto: CreateTodoDto): Promise<any> {
        const todo = await prisma.todo.create({
            data: createTodoDto,
        });
        return TodoEntity.fromObject(todo);
    }

    /**
     * 
     * @returns TodoEntity[]        
     * 
     */
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany({
                orderBy: {
                    id: 'desc',
                }
        });

        return todos.map(todo => TodoEntity.fromObject(todo));
    }

    /**
     * 
     * @param {number} id
     * @returns TodoEntity | null
     */
    async getById(id: number): Promise<any> {
        const todo = await prisma.todo.findUnique({
            where: { id },
        });
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return todo ? TodoEntity.fromObject(todo) : null;
    }
    
    /**
     * 
     * @param updateTodoDto 
     * @returns TodoEntity     
     */
    async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.getById(updateTodoDto.id);
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto.values,
        });
        return TodoEntity.fromObject(updatedTodo);
    }

    /**
     * 
     * @param id 
     * @returns TodoEntity     
     */
    async delete(id: number): Promise<TodoEntity> {
        await this.getById(id);
        const deletedTodo = await prisma.todo.delete({
            where: { id },
        });

        return TodoEntity.fromObject(deletedTodo);
    }
}