
export class TodoEntity {
    
    /**
     * 
     * @param id 
     * @param title 
     * @param createdAt 
     * @param updatedAt         
     */

    constructor(
        public id: number,
        public title: string,
        public createdAt: Date,
        public updatedAt?: Date | null,
    ) { }

    get isCompleted() {
        return !!this.updatedAt; 
    }

    /**
     * 
     * @param obj 
     * @returns TodoEntity       
     */

    public static fromObject(obj: {[key: string]: any}) {
        const { id, title, createdAt, updatedAt } = obj;
        if (!id) {
            throw new Error('Id is required');
        }
        if (!title) {
            throw new Error('Title is required');
        }  
        if (!createdAt) {
            throw new Error('CreatedAt is required');
        }
        let newUpdatedAt;
        if (newUpdatedAt) {
            newUpdatedAt = new Date(updatedAt);
            if(isNaN(newUpdatedAt.getTime())) {
                throw new Error(' UpdatedAt is not a valid date');
            }
        }
        return new TodoEntity(id, title, createdAt, newUpdatedAt);
    }
}




