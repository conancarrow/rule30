import init, { Automaton } from './pkg/rule30.js';

const WIDTH = 80;
const ROWS = 40;

let automaton;
let grid;
let inputRow;

async function main() {
    await init();
    automaton = new Automaton();

    grid = document.getElementById('grid');

    createInputRow();

    document.getElementById('run').addEventListener('click', run);
    document.getElementById('reset').addEventListener('click', reset);
}

function createInputRow() {
    inputRow = document.createElement('div');
    inputRow.className = 'row';

    for (let i = 0; i < WIDTH; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell clickable';
        cell.dataset.index = i;
        cell.addEventListener('click', toggleCell);
        inputRow.appendChild(cell);
    }

    grid.appendChild(inputRow);
}

function toggleCell(e) {
    const index = parseInt(e.target.dataset.index);
    const cell = e.target;
    const isAlive = cell.classList.toggle('alive');
    automaton.set_cell(index, isAlive ? 1 : 0);
}

function run() {
    // Clear previous output rows (keep input row)
    while (grid.children.length > 1) {
        grid.removeChild(grid.lastChild);
    }

    // Generate and display ROWS generations
    for (let r = 0; r < ROWS; r++) {
        automaton.step();
        const row = document.createElement('div');
        row.className = 'row';

        for (let i = 0; i < WIDTH; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (automaton.get_cell(i) === 1) {
                cell.classList.add('alive');
            }
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
}

function reset() {
    // Clear all rows
    grid.innerHTML = '';

    // Reset automaton state
    automaton.reset();

    // Recreate input row
    createInputRow();
}

main();
