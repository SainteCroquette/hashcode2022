export default class Dev {
    constructor(
        public name: string,
        public skills: Map<string, number> = new Map<string, number>(),
        public isAvailable: Boolean = true
    ) {}

    addSkill(skill: string, level: number) {
        this.skills.set(skill, level);
    }

    improveSkill(skill: string) {
        const skillLevel = this.skills.get(skill);
        if (skillLevel) {
            this.skills.set(skill, skillLevel + 1);
        } else {
            this.skills.set(skill, 1);
        }
    }

    recruit() {
        this.isAvailable = false;
    }

    fire() {
        this.isAvailable = false;
    }
}
