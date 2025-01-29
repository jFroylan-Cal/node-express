import { TodoEntity } from "../../entities/Todo.entity";
import { TodoRepository } from "../../repository/Todo.repository";

/**
 * GetTodoUseCase
 */
export interface GetTodoUseCase {
    /**
     * Execute
     * @param {number} id
     * @returns TodoEntity
     */
    execute(id: number): Promise<TodoEntity | null>;
}
/**
 * GetTodoUseCase
 */
export class GetTodo implements GetTodoUseCase {
    /**
     * 
     * @param repository
     */
    constructor(private readonly repository: TodoRepository) { }


    /**
     * Execute
     * @param {number} id
     * @returns TodoEntity
     */
    execute(id: number): Promise<TodoEntity | null> {
        return this.repository.getById(id);
    }
}

