import Dev from "./Dev";
import Project from "./Project";

export default class DevArmy {
    constructor(public devs: Dev[]) {}

    popFirstFound(skill: string, level: number): Dev|null {
        let devSelected: Dev|null = null;
        let selectedSkillLevel = 0;

        this.devs.forEach(dev => {
            const skillLevel = dev.getSkillLevel(skill);
            if (skillLevel && skillLevel >= level) {
                if (!selectedSkillLevel || selectedSkillLevel > skillLevel) {
                    devSelected = dev;
                    selectedSkillLevel = skillLevel;
                }
            }
        })

        if (devSelected) {
            // @ts-ignore
            this.devs = this.devs.filter(dev => dev.name !== devSelected.name)
        }

        return devSelected;
    }

    getDevsBack(devs: Dev[]) {
        this.devs = [...this.devs, ...devs];
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