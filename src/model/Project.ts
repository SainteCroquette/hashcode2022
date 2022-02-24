import Dev from './Dev';

type Task = {
    skill: string;
    level: number;
    dev: Dev|null;
};

export default class Project {
    constructor(
        public name: string,
        public duration: number,
        public score: number,
        public deadLine: number,
        public tasks: Task[],
        public started: Boolean = false,
    ) {}

    startProjectIfDevsAvailable(devs: Dev[]) {
        this.tasks.forEach(task => {
        })
    }

    endProject(date: number): number {
        /*this.workers.forEach(dev => {
            dev.fire();
        });*/
        if (date >= this.deadLine + this.score)
            return 0;
        if (date >= this.deadLine)
            return this.score - (date - this.deadLine);
        return this.score
    }
}