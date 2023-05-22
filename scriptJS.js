class Wood {
   length;
   amount;
   constructor(length, amount) {
    this.length = length;
    this.amount = amount;
   }
}

class FinalWood {
  amount;
  key;
  remainder;
  woods;
  constructor(etalonLength) {
    this.remainder = etalonLength;
    this.woods = [];
    this.amount = 1;
  }
  findWoodByLength(length) {
    let wood = this.woods.find(item => item.length === length);
    return wood;
  }
  getKey(){
    let key = new String();
    for (const wood of this.woods.sort(item => item.length)) {
      key += String(wood.length) + String(wood.amount);
    }
    return key;
  }
}

let calculateBtn = document.getElementById("calculateBtn");

calculateBtn.onclick = function() {
  let finalWoods = getFinalWoods();
  showFinalWoods(finalWoods);
};

function getFinalWoods() {
  let etalonLength = +document.getElementById('etalonLength').value;
  let tbody = document.querySelector('tbody');

  let rows = tbody.rows;

  let inputWoods = [];
  for(let i = 0; i < rows.length; i++) {
    let objectRow = rows[i];
    let cells = objectRow.cells;
    let length = +cells[0].textContent;
    let amount = +cells[1].textContent;
    let inputWood = new Wood(length, amount);
    inputWoods.push(inputWood);
  }

  let finalWoods = [];

  let result = true;

  do {
    result = isAnyAmountWoodsPositive(inputWoods);

    if(!result) {
      break;
    }
    let finalWood = new FinalWood(etalonLength);
    
    while(true) {
      let inputWoodWithMaxLength = findInputWoodWithMaxLength(finalWood.remainder, inputWoods)

      if(inputWoodWithMaxLength === null) {
        break;
      };
      updateFinalWood(finalWood, inputWoodWithMaxLength);
      inputWoodWithMaxLength.amount = inputWoodWithMaxLength.amount - 1;
    }

    finalWood.key = finalWood.getKey();
    let existFinalWood = finalWoods.find(item => item.key === finalWood.key);
    if(existFinalWood === undefined) {
      finalWoods.push(finalWood);
    } else {
      existFinalWood.amount++;
    }
  } while (result);

  return finalWoods;
}

function isAnyAmountWoodsPositive(inputWoods) { 
  result = false;
  for (const inputWood of inputWoods) {
    if(inputWood.amount > 0) {
      result = true;
      break;
    }
  }
  return result;
}

function findInputWoodWithMaxLength(remainder, inputWoods) { 
  let inputLengths = [];
  for(let inputWood of inputWoods) {
    let length = inputWood.length;
    if(inputWood.amount > 0 && length <= remainder) {
      inputLengths.push(length);
    };
  };
  if(inputLengths.length === 0) {
    return null
  }
  let maxInputLength = Math.max(...inputLengths);
  return inputWoods.find(item => item.length == maxInputLength);
}

function updateFinalWood(finalWood, inputWoodWithMaxLength) { 
  let wood = finalWood.findWoodByLength(inputWoodWithMaxLength.length);
  if (wood === undefined){
    finalWood.woods.push(new Wood(inputWoodWithMaxLength.length, 1));
  } else{
    wood.amount = wood.amount + 1;
  }
  finalWood.remainder = finalWood.remainder - inputWoodWithMaxLength.length;
}

function showFinalWoods(finalWoods) {
  let table = document.createElement('table');

  let thead = document.createElement('thead');
  let headerRow = document.createElement('tr');
  let headerCellNumber = document.createElement('th');
  headerCellNumber.textContent = '№';
  let headerCellCuttingFormula = document.createElement('th');
  headerCellCuttingFormula.textContent = 'Распил доски';
  let headerCellRemainder = document.createElement('th');
  headerCellRemainder.textContent = 'Остаток';
  let headerCellAmountWood = document.createElement('th');
  headerCellAmountWood.textContent = 'Количество досок';

  headerRow.appendChild(headerCellNumber);
  headerRow.appendChild(headerCellCuttingFormula);
  headerRow.appendChild(headerCellRemainder);
  headerRow.appendChild(headerCellAmountWood);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  let tbody = document.createElement('tbody');

  let counter = 1;

  for(let element of finalWoods) {
    let bodyRow = document.createElement('tr');

    let dataCellNumber = document.createElement('td');
    dataCellNumber.textContent = counter++;

    let dataCellCuttingFormula = document.createElement('td');

    let textContent = String();
    for(let wood of element.woods) {
  
      textContent += `${wood.length} x ${wood.amount}`;
      let i = element.woods.indexOf(wood);
      if(element.woods.length > 1 && i !== element.woods.length - 1 ) {
        textContent += ', ';
      }
      dataCellCuttingFormula.textContent = textContent;
    }

    let dataCellRemainder = document.createElement('td');
    dataCellRemainder.textContent = element.remainder;
    let dataCellAmountWood = document.createElement('td');
    dataCellAmountWood.textContent = element.amount;

    bodyRow.appendChild(dataCellNumber);
    bodyRow.appendChild(dataCellCuttingFormula);
    bodyRow.appendChild(dataCellRemainder);
    bodyRow.appendChild(dataCellAmountWood);

    tbody.appendChild(bodyRow);
  }

  table.appendChild(tbody);

  var container = document.getElementById('tableContainer');
  container.appendChild(table);
  console.log(finalWoods);
  showTotalNumberWoods(tbody, finalWoods)
}

function showTotalNumberWoods(tbody, finalWoods) {
  let totalRow = document.createElement('tr')
  let totalNumberWoods = 0;
  for(let element of finalWoods) {
    totalNumberWoods += element.amount
  }
  totalRow.textContent = 'ИТОГО досок: ' + totalNumberWoods + ' штук';
  tbody.appendChild(totalRow);
}

