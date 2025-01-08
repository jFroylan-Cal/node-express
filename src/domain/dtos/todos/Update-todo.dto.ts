export class UpdateTodoDto { 
    private constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly updatedAt?: Date
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.title) returnObj.title = this.title;
        if (this.updatedAt) returnObj.updatedAt = this.updatedAt;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { id, title, updatedAt } = props;
        if (!id || isNaN(id)) {
            return ['ID must be a number', undefined];
        }
        let newUpdatedAt = updatedAt;
        if (updatedAt) {
            newUpdatedAt = new Date(updatedAt);
            if(newUpdatedAt.toString() === 'Invalid Date') {
                return ['Invalid date'];
            }
        }
        return [undefined, new UpdateTodoDto(id,title, newUpdatedAt)];
    }
} 