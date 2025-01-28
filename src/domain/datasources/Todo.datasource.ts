import { CreateTodoDto } from "../dtos/todos/Create-todo.dto";
import { UpdateTodoDto } from "../dtos/todos/Update-todo.dto";
import { TodoEntity } from "../entities/Todo.entity";

export abstract class TodoDatasource {
    
    /**
     * 
     * @param createTodoDto 
     * @returns TodoEntity
     */
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    
    /**
     * 
     * @returns TodoEntity[]        
     */
    abstract getAll(): Promise<TodoEntity[]>;
    
    /**
     * 
     * @param {number} id
     * @returns TodoEntity | null
     */
    abstract getById(id: number): Promise<TodoEntity | null>;
    
    /**
     * 
     * @param updateTodoDto 
     */
    abstract update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    
    /**
     * 
     * @param id 
     */
    abstract delete(id: number): Promise<TodoEntity>;
}

