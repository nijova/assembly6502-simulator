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

const resetMemory = () => {
  for (let i=0; i<256; i++) {
    document.getElementById(`memory_${hex(i)}`).innerText = '00';
  }
}

let queue = [];

const reset = () => {
  resetMemory()
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
  if (addr[0] === '#' && addr[1] === '$') {
    return [null, addr.slice(2)];
  } else if (addr[0] === '$') {
    let location = 'memory_' + addr.slice(1);
    return [location, document.getElementById(location).innerText];
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
  'LDA': 'LoaDAccumulator',
  'LDX': 'LoaDXregister',
  'LDY': 'LoaDYregister',
  'STA': 'SToreAccumulator',
  'STX': 'SToreXregister',
  'STY': 'SToreYregister',
  'TAX': 'TransferAtoX',
  'TAY': 'TransferAtoY',
  'TXA': 'TransferXtoA',
  'TYA': 'TransferYtoA',
};

const LoaDAccumulator = (args) => {
  let addr = addressing(args[0]);
  A = addr[1];
  console.log(`A = ${A}`);
}

const LoaDXregister = (args) => {
  let addr = addressing(args[0]);
  X = addr[1];
  console.log(`X = ${X}`);
}

const LoaDYregister = (args) => {
  let addr = addressing(args[0]);
  Y = addr[1];
  console.log(`Y = ${Y}`);
}

const SToreAccumulator = (args) => {
  let addr = addressing(args[0]);
  document.getElementById(addr[0]).innerText = A;
  console.log(`${A} stored at ${addr[0]}`)
}

const SToreXregister = (args) => {
  let addr = addressing(args[0]);
  document.getElementById(addr[0]).innerText = X;
  console.log(`${X} stored at ${addr[0]}`)
}

const SToreYregister = (args) => {
  let addr = addressing(args[0]);
  document.getElementById(addr[0]).innerText = Y;
  console.log(`${Y} stored at ${addr[0]}`)
}

const TransferAtoX = (_) => {
  X = A;
  console.log(`X = ${X}`);
}

const TransferAtoY = (_) => {
  Y = A;
  console.log(`Y = ${Y}`);
}

const TransferXtoA = (_) => {
  A = X;
  console.log(`A = ${A}`);
}

const TransferYtoA = (_) => {
  A = Y;
  console.log(`A = ${A}`);
}
