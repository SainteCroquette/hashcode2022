import {readInput, writeOutput} from './file';
import Dev from "./model/Dev";
import Project from "./model/Project";
import DevArmy from "./model/DevArmy";

const {devs, projects} = readInput("a_an_example.in.txt");

function hashcode() {
    let devs: Dev[]
    let devArmy: DevArmy
    let projects: Project[] = []
    let date: number = 0;
    let totalScore: number = 0

    const output = new Output();

    console.log("== COMPUTING ==");
    while (date <= maxDay) {
        console.log(`Day: ${date}`);
        projects.forEach(project => {
            if (project.started && !project.done) {
                if (project.started_at + project.duration === date) {
                    const score = project.endProject(date, devArmy);
                    totalScore += score;
                    output.addProject(project);
                    console.log(`Finished: ${project.name}, scoring ${score}`);
                }
            }
        });

        projects.forEach(project => {
            if (!project.started) {
                const hasStarted = devArmy.tryToStartProject(project, date);
                if (hasStarted) {
                    console.log(`Starting: ${project.name} with:`);
                    project.tasks.forEach(task => {
                        console.log(`${task.dev?.name}: ${task.skill}(${task.level})`)
                    })
                }
            }
        });

        date++;
    }
}