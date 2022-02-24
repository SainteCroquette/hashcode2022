import Project from "./Project";

export default class Output {
    constructor(
        public count: number = 0,
        public resolved_string: string = ""
    ) {}

    addProject(project: Project) {
        this.resolved_string += project.name + "\n";
        this.resolved_string += project.tasks.map(task => task.dev?.name).join(" ");
        this.resolved_string += "\n";
        this.count += 1;
    }

    dump() {
        return `${this.count}\n${this.resolved_string}`
    }
}
