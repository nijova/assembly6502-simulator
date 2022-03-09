const memory = document.getElementById('memory');
initMemory(memory);

let A, X, Y = 0;
const FLAGS = {
  'Negative': false, 
  'oVerflow':false, 
  'Break':false, 
  'Decimal': false,
  'Interrupt': false,
  'Zero': false,
  'Carry': false
}

reset();
