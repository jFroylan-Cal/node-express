import { TodoEntity } from "../../entities/Todo.entity";
import { TodoRepository } from "../../repository/Todo.repository";

/**
 * DeleteTodoUseCase
 */
export interface DeleteTodoUseCase {
    /**
     * Execute
     * @param id
     * @returns TodoEntity
     */
    execute(id: number): Promise<TodoEntity>;
}
/**
 * DeleteTodoUseCase
 */
export class DeleteTodo implements DeleteTodoUseCase {
    /**
     * 
     * @param repository
     */
    constructor(private readonly repository: TodoRepository) { }


    /**
     * Execute
     * @param id
     * @returns TodoEntity
     */
    execute(id: number): Promise<TodoEntity> {
        return this.repository.delete(id);
    }
}

