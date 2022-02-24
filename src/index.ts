import {readInput, writeOutput} from './file';

import Output from "./model/Output";

import DevArmy from "./model/DevArmy";

// const file = "a_an_example";
// const file = "b_better_start_small";
const file = "c_collaboration";
// const file = "d_dense_schedule";
// const file = "e_exceptional_skills";

function hashcode() {
    console.log("== PARSING ==");
    const { devs, projects, maxDay } = readInput(`${file}.in.txt`);

    let devArmy: DevArmy = new DevArmy([...devs]);
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

        date += 100;
    }

    writeOutput(output, `${file}.out`);
}

hashcode();