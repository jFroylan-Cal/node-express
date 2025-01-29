import { CreateTodoDto } from "../../dtos/todos/Create-todo.dto";
import { TodoEntity } from "../../entities/Todo.entity";
import { TodoRepository } from "../../repository/Todo.repository";

/**
 * CreateTodoUseCase
 */
export interface CreateTodoUseCase {
    /**
     * Execute
     * @param dto
     * @returns TodoEntity
     */
    execute(dto: CreateTodoDto): Promise<TodoEntity>;
}
/**
 * CreateTodoUseCase
 */
export class CreateTodo implements CreateTodoUseCase {
    /**
     * 
     * @param repository
     */
    constructor(private readonly repository: TodoRepository) { }

    /**
     * Execute
     * @param dto
     * @returns TodoEntity
     */
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(dto);
    }
}

