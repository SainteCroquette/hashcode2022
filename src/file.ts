import fs from 'fs';

import Input from './model/Input';
import Output from './model/Output';

export function readInput(path: string): Input {
    const input = fs.readFileSync(path, 'utf8');

    return {};
}

export function writeOutput(output: Output, path: string): void {
    const outputString = JSON.stringify(output);

    fs.writeFileSync(path, outputString);
}