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

    while (true) {
        projects.forEach(project => {
            if (!project.started) {
                devArmy.tryToStartProject(project);
            } else {

            }
        });
        date += 1;
    }
}