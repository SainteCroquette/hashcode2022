import Dev from "./Dev";
import Project from "./Project";

export default class DevArmy {
    constructor(
        public devs: Dev[] = []
    ) {}

    popFirstFound(skill: string, level: number): Dev|undefined {
        this.devs.forEach(dev => {
            const skillLevel = dev.getSkillLevel(skill);
            if ( skillLevel && skillLevel >= level) {
                this.devs = this.devs.filter(de => de != dev)
                return dev;
            }
        })
        return undefined
    }

    getDevsBack(devs: Dev[]) {
        this.devs.concat(devs);
    }

    tryToStartProject(project: Project, date: number): boolean {
        let team: Dev[] = []
        project.tasks.forEach(task => {
            const dev = this.popFirstFound(task.skill, task.level);
            if (dev) {
                team.push(dev);
                task.dev = dev;
            }
        });
        if (team.length < project.tasks.length) {
            this.getDevsBack(team);
            return false;
        }
        project.started = true;
        project.started_at = date;
        return true;
    }
}