const hex = (n, width=2) => n.toString(16).padStart(width, '0');

const initMemory = (memory) => {
  let maxMemory = 16;
  for (let i=0; i<maxMemory; i++) {
    let ii = i * 16;
    let index = hex(ii);
    let row = document.createElement('tr');
    row.id = 'row' + index;
    let rowIndex = document.createElement('td');
    rowIndex.innerText = index;
    row.appendChild(rowIndex);
    for (let j=0; j<16; j++) {
      let hexJ = hex(j);
      let entry = document.createElement('td');
      entry.id = 'memory_' + hex(ii + j);
      entry.innerText = '00';
      row.appendChild(entry);
    }
    memory.appendChild(row);
  }
}
