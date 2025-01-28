export class CreateTodoDto {

    /**
     * 
     * @param title 
     * @param createdAt 
     */
    private constructor(
        public readonly title: string,
        public readonly createdAt: Date
    ) { }
    

    /**
     * 
     * @param props 
     * @returns [string?, CreateTodoDto?]
     */
    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { title } = props;
    if (!title) {
        return ['Title is required', undefined];
    }
        const createdAt = new Date();
        
    return [undefined, new CreateTodoDto(title, createdAt)];
    }

}
