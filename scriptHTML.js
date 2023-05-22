document.getElementById("addBtn").onclick = addTableRow;

function addTableRow() {
  let tr = document.createElement("tr");

  let tdLength = document.createElement("td");
  let length = +document.getElementById("inputLength").value;
  tdLength.innerHTML = length;
  

  let tdAmount = document.createElement("td");
  let amount = +document.getElementById("inputAmount").value;
  tdAmount.innerHTML = amount;

  if(AreInputsValid(length, amount)) {
    
    tr.appendChild(tdLength);
    tr.appendChild(tdAmount);

    clearInput()

    createButtonDeleteLengthAndAmount(tr)

    let tbody = document.querySelector("tbody"); 
    tbody.appendChild(tr);
  }
}

function AreInputsValid(length, amount) {
  let etalonLength = +document.getElementById('etalonLength').value;
  if(length === 0 || amount === 0) {
    alert('Вы оставили поля пустыми или ввели число 0, либо ввели число эйлера. Необходимо исправить')
    return false;
  }
  if(length > etalonLength) {
    alert('Длина доски должна быть меньше длины эталонной доски')
    return false;
  }
  if(length <= 0) {
    alert('Значение длины должно быть больше нуля.')
    return false;
  }
  if(amount <= 0) {
    alert('Значение количества должно быть больше нуля.')
    return false;
  }
  return true;
}

function clearInput() {
  let inputLength = document.querySelector('#inputLength');
  let inputAmount = document.querySelector('#inputAmount')
  inputLength.value = '';
  inputAmount.value = '';
}

function createButtonDeleteLengthAndAmount(tr) {
  var buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "X";

  var tdDelete = document.createElement("td");

  tdDelete.appendChild(buttonDelete);

  tr.appendChild(tdDelete);

  buttonDelete.addEventListener('click', deleteRow)

}

function deleteRow(event) {
  var button = event.target; 
  var row = button.closest('tr'); 
  row.remove();
}

