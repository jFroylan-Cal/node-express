export class UpdateTodoDto {
    /**
     * 
     * @param id 
     * @param title 
     * @param updatedAt
     * @returns UpdateTodoDto
     * 
     */
    private constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly updatedAt?: Date
    ) { }

    /**
     * 
     * @returns {[key: string]: any}
     */
    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.title) returnObj.title = this.title;
        if (this.updatedAt) returnObj.updatedAt = this.updatedAt;
        return returnObj;
    }

    /**
     * 
     * @param props 
     * @returns [string?, UpdateTodoDto?] 
     */
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