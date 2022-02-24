import {readInput, writeOutput} from './file';

import Output from "./model/Output";

import DevArmy from "./model/DevArmy";
import Project from "./model/Project";

//const file = "a_an_example";
const file = "b_better_start_small";
// const file = "c_collaboration";
// const file = "d_dense_schedule";
//const file = "e_exceptional_skills";
// const file = "f_find_great_mentors";

function hashcode() {
    console.log("== PARSING ==");
    const { devs, projects, maxDay } = readInput(`${file}.in.txt`);
    console.log(maxDay);
    let increment = 1;
    if (maxDay > 10000) {
        increment = 100;
    } else if (maxDay > 1000) {
        increment = 10;
    }

    let projectsNotStarted: Project[] = [...projects];
    let projectsStartedAndOngoing: Project[] = [];

    let devArmy: DevArmy = new DevArmy([...devs]);
    let date: number = 0;
    let totalScore: number = 0

    const output = new Output();

    console.log("== COMPUTING ==");
    while (date <= maxDay) {
        console.log(`Day: ${date}`);
        projectsStartedAndOngoing.forEach(project => {
            if (project.started && !project.done) {
                if (project.started_at + project.duration <= date) {
                    const score = project.endProject(date, devArmy);
                    totalScore += score;
                    output.addProject(project);
                    console.log(`Finished: ${project.name}, scoring ${score}`);
                }
            }
        });
        projectsStartedAndOngoing = projectsStartedAndOngoing.filter(({ done }) => !done);

        projectsNotStarted.forEach(project => {
            if (!project.started) {
                const hasStarted = devArmy.tryToStartProject(project, date);
                if (hasStarted) {
                    projectsStartedAndOngoing.push(project);
                    console.log(`Starting: ${project.name} with:`);
                    project.tasks.forEach(task => {
                        console.log(`${task.dev?.name}: ${task.skill}(${task.level})`)
                    })
                }
            }
        });
        projectsNotStarted = projectsNotStarted.filter(({ started }) => !started);

        date += increment;
    }

    writeOutput(output, `${file}.out`);
}

hashcode();