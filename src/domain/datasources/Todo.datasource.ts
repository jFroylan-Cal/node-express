import { CreateTodoDto } from "../dtos/todos/Create-todo.dto";
import { UpdateTodoDto } from "../dtos/todos/Update-todo.dto";
import { TodoEntity } from "../entities/Todo.entity";

export abstract class TodoDatasource {
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    abstract getAll(): Promise<TodoEntity[]>;
    
    abstract getById(id: number): Promise<TodoEntity | null>;
    
    abstract update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    
    abstract delete(id: number): Promise<TodoEntity>;
}

