import { TodoEntity } from "../../entities/Todo.entity";
import { TodoRepository } from "../../repository/Todo.repository";

/**
 * GetTodosUseCase
 */
export interface GetTodosUseCase {
    /**
     * Execute
     * @returns TodoEntity
     */
    execute(): Promise<TodoEntity[]>;
}
/**
 * GetTodosUseCase
 */
export class GetTodos implements GetTodosUseCase {
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
    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }
}

