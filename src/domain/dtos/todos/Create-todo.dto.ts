export class CreateTodoDto {
    private constructor(
        public readonly title: string,
        public readonly createdAt: Date
    ) { }
    
    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { title } = props;
    if (!title) {
        return ['Title is required', undefined];
    }
        const createdAt = new Date();
        
    return [undefined, new CreateTodoDto(title, createdAt)];
    }

}
