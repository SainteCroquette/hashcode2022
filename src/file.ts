import fs from 'fs';
import path from 'path';

import Dev from './model/Dev';
import Project from './model/Project';
import Input from './model/Input';
import Output from './model/Output';

export function readInput(file: string): Input {
    const devs: Dev[] = [];
    const projects: Project[] = [];
    let maxDay = 0;

    const pathToFile = path.join(__dirname, '..', 'sample', 'input_data', file);
    const input = fs.readFileSync(pathToFile, 'utf8');
    const inputLines = input.split('\n');

    const firstLine = inputLines[0];
    const resFirstLine = /^([0-9]{1,5}) ([0-9]{1,5})$/.exec(firstLine);
    // @ts-ignore
    const numberOfDevs = parseInt(resFirstLine[1], 10);
    // @ts-ignore
    const numberOfProjects = parseInt(resFirstLine[2], 10);

    const devRegex = /^([A-Za-z0-9]{1,20}) ([0-9]{1,3})$/;
    const skillRegex = /^([A-Za-z0-9+-]{1,20}) ([0-9]{1,2})$/;
    let currentLine = 1;
    for (let devCount = 0; devCount < numberOfDevs; devCount++) {
        // @ts-ignore
        const [, devName, devSkillsNumber] = devRegex.exec(inputLines[currentLine]);
        devs.push(new Dev(devName));
        currentLine++;

        for (let skillCount = 0; skillCount < parseInt(devSkillsNumber, 10); skillCount++) {
            const [, skillName, skillLevel] = skillRegex.exec(inputLines[currentLine]);
            devs[devCount].addSkill(skillName, parseInt(skillLevel, 10));
            currentLine++;
        }
    }

    const projectRegex = /^([A-Za-z0-9]{1,20}) ([0-9]{1,5}) ([0-9]{1,5}) ([0-9]{1,5}) ([0-9]{1,3})$/;
    const roleRegex = /^([A-Za-z0-9+-]{1,20}) ([0-9]{1,3})$/;
    for (let projectCount = 0; projectCount < numberOfProjects; projectCount++) {
        const [, projectName, numberDays, score, bestBeforeDay, projRoleNumber] = projectRegex.exec(inputLines[currentLine]);
        projects.push(new Project(projectName, parseInt(numberDays, 10), parseInt(score, 10), parseInt(bestBeforeDay, 10)));
        currentLine++;

        if (parseInt(bestBeforeDay, 10) > maxDay) {
            maxDay = parseInt(bestBeforeDay, 10);
        }

        for (let roleCount = 0; roleCount < parseInt(projRoleNumber, 10); roleCount++) {
            const [, roleName, roleLevel] = roleRegex.exec(inputLines[currentLine]);
            projects[projectCount].addTask(roleName, roleLevel);
            currentLine++;
        }
    }

    return { devs, projects, maxDay };
}

export function writeOutput(output: Output, file: string): void {
    const pathToFile = path.join(__dirname, '..', 'results', file);

    fs.writeFileSync(pathToFile, output.dump());
}
