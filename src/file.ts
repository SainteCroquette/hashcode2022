import fs from 'fs';
import path from 'path';

import Dev from './model/Dev';
import Project from './model/Project';
import Input from './model/Input';
import Output from './model/Output';

export function readInput(file: string): Input {
    const devs: Dev[] = [];
    const projects: Project[] = [];

    const pathToFile = path.join(__dirname, '..', 'sample', 'input_data', file);
    const input = fs.readFileSync(pathToFile, 'utf8');

    const firstLine = input[0];
    console.log(firstLine);
    const resFirstLine = /^([0-9]{1,5}) ([0-9]{1,5})$/.exec(firstLine);
    console.log(resFirstLine);
    // @ts-ignore
    const numberOfDevs = parseInt(resFirstLine[1], 10);
    // @ts-ignore
    const numberOfProjects = parseInt(resFirstLine[2], 10);

    console.log(numberOfDevs, numberOfProjects);

    let currentLine = 1;
    for (let i = 0; i < numberOfDevs; i++) {

    }

    for (let i = 0; i < numberOfProjects; i++) {

    }

    return { devs, projects };
}

export function writeOutput(output: Output, path: string): void {
    const outputString = JSON.stringify(output);

    fs.writeFileSync(path, outputString);
}