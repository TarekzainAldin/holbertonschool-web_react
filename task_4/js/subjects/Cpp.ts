namespace Subject{
    export interface TeacherInterface{
        experienceTeachingC?:number;

    }
    export class cpp extends Subject{
        getRequierments():string {
            return 'here is the list of requierment for cpp';
        }
        getAvailableTeacher(): string {
            if (this.teatche.experienceTeachingC > 0) {
                return `Available Teacher: ${this.teatche.firstName}`;
            } else {
                return 'No available teacher';
            }
        }
    }
}