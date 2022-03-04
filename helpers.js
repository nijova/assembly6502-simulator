const hex = (n, width=2) => n.toString(16).padStart(width, '0');

const initMemory = (memory) => {
  let maxMemory = 16;
  for (let i=0; i<maxMemory; i++) {
    let index = hex(i * 16);
    let row = document.createElement('tr');
    row.id = 'row' + index;
    let rowIndex = document.createElement('td');
    rowIndex.innerText = index;
    row.appendChild(rowIndex);
    for (let j=0; j<16; j++) {
      let hexJ = hex(j);
      let entry = document.createElement('td');
      entry.id = 'memory_' + hex(i * 16 + j);
      entry.innerText = '00';
      row.appendChild(entry);
    }
    memory.appendChild(row);
  }
}

let queue = [];

const reload = () => {
  queue = [];
  let instructions = document.getElementById('input').value;
  for (let instr of instructions.split('\n')) {
    queue.push(instr);
  }
}

const next = () => {
  let instruction = queue.shift();
  handleInstruction(instruction);
}

const addressing = (addr) => {
  if (addr[0] === '#') {
    return addr.slice(2);
  }
}

const handleInstruction = (instruction) => {
  let args = instruction.split(' ');
  let opcode = args.shift();
  if (opcodes[opcode] != -1) {
    console.log(opcodes[opcode])
    eval(opcodes[opcode])(args);
  }
}

const opcodes = {
  'LDA': 'LoaDAccumulator'
};

const LoaDAccumulator = (args) => {
  let value = addressing(args[0]);
  A = value;
  console.log(`A = ${value}`);
}