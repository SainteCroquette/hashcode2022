import Dev from './Dev';
import DevArmy from "./DevArmy";

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
        public started_at: number = 0,
        public done: boolean = false
    ) {}

    addTask(skill: string, level: number) {
        this.tasks.push({ skill, level, dev: null });
    }

    startProjectIfDevsAvailable(devs: Dev[]) {
        this.tasks.forEach(task => {
        })
    }

    endProject(date: number, devArmy: DevArmy): number {
        this.tasks.forEach(({ dev, skill, level }) => {
            if (dev) {
                // @ts-ignore
                if (level >= dev.getSkillLevel(skill)) {
                    dev.improveSkill(skill);
                }
                devArmy.devs.push(dev);
            }
        });
        this.done = true;
        if (date >= this.deadLine + this.score)
            return 0;
        if (date >= this.deadLine)
            return this.score - (date - this.deadLine);
        return this.score
    }
}