import { TodoDatasource } from "../../domain/datasources/Todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/Create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/Update-todo.dto";
import { TodoEntity } from "../../domain/entities/Todo.entity";
import { TodoRepository } from "../../domain/repository/Todo.repository";


export class TodoRepositoryImpl implements TodoRepository { 
    
    constructor(private readonly dataSource: TodoDatasource) { }

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.dataSource.create(createTodoDto);
    }

    getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }

    getById(id: number): Promise<TodoEntity | null> {
        return this.dataSource.getById(id);
    }

    update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.dataSource.update(updateTodoDto);
    }

    delete(id: number): Promise<TodoEntity> {
        return this.dataSource.delete(id);
    }
    

}

