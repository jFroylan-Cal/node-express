import { UpdateTodoDto } from "../../dtos/todos/Update-todo.dto";
import { TodoEntity } from "../../entities/Todo.entity";
import { TodoRepository } from "../../repository/Todo.repository";

/**
 * UpdateTodoUseCase
 */
export interface UpdateTodoUseCase {
    /**
     * Execute
     * @param dto
     * @returns TodoEntity
     */
    execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}
/**
 * UpdateTodoUseCase
 */
export class UpdateTodo implements UpdateTodoUseCase {
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
    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.update(dto);
    }
}

