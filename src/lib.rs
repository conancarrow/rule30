use wasm_bindgen::prelude::*;

const WIDTH: usize = 80;
const RULE: u8 = 30;

#[wasm_bindgen]
pub struct Automaton {
    cells: Vec<u8>,
}

#[wasm_bindgen]
impl Automaton {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Automaton {
        Automaton {
            cells: vec![0; WIDTH],
        }
    }

    pub fn set_cell(&mut self, index: usize, value: u8) {
        if index < WIDTH {
            self.cells[index] = value & 1;
        }
    }

    pub fn get_cell(&self, index: usize) -> u8 {
        if index < WIDTH {
            self.cells[index]
        } else {
            0
        }
    }

    pub fn step(&mut self) {
        let mut next = vec![0u8; WIDTH];
        for i in 0..WIDTH {
            let left = if i == 0 { 0 } else { self.cells[i - 1] };
            let center = self.cells[i];
            let right = if i == WIDTH - 1 { 0 } else { self.cells[i + 1] };
            let pattern = (left << 2) | (center << 1) | right;
            next[i] = (RULE >> pattern) & 1;
        }
        self.cells = next;
    }

    pub fn reset(&mut self) {
        self.cells = vec![0; WIDTH];
    }

    pub fn width(&self) -> usize {
        WIDTH
    }
}
