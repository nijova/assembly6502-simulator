const hex = (n, width=2) => n.toString(16).padStart(width, '0');

const initMemory = () => {
  let maxMemory = 2**8;
  let width = hex(maxMemory - 1).length;
  const memory = document.getElementById('memory');
  for (let i=0; i<maxMemory; i++) {
    let hexI = hex(i);
    let row = document.createElement('tr');
    row.id = 'row' + hexI;
    let rowIndex = document.createElement('td');
    rowIndex.innerText = hexI;
    row.appendChild(rowIndex);
    for (let j=0; j<16; j++) {
      let hexJ = hex(j);
      let entry = document.createElement('td');
      entry.id = '' + hexI + hexJ;
      entry.innerText = '00';
      row.appendChild(entry);
    }
    memory.appendChild(row);
  }
}
