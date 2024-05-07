const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const rgnumberInput = document.getElementById('rgnumber');
const level3Input = document.getElementById('level3');
const level4Input = document.getElementById('level4');
const level5Input = document.getElementById('level5');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];
console.log(records.length);
// Function to check for duplicate names
function isDuplicateName(rgnumber) {
  return records.some(
    (record) => record.rgnumber.toLowerCase() === rgnumber.toLowerCase()
  );
}

// Display records
function displayRecords() {
  recordList.innerHTML = '';
  console.log(records.length);
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5" style="text-align:center;color:red;">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.rgnumber}</td>
                    <td>${record.level3}</td>
                    <td>${record.level4}</td>
                    <td>${record.level5}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}

// Add or Update a record
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const rgnumber = rgnumberInput.value;
  const level3 = level3Input.value;
  const level4 = level4Input.value;
  const level5 = level5Input.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && rgnumber && level3 && level4 && level5) {
    if (isDuplicateName(rgnumber) && editIndex === -1) {
      alert('Student already exists.');
      return;
    }

    if (editIndex === -1) {
      // Add a new record
      records.push({ name, rgnumber, level3, level4, level5 });
    } else {
      // Update an existing record
      records[editIndex] = { name, rgnumber, level3, level4, level5 };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    rgnumberInput.value = '';
    level3Input.value = '';
    level4Input.value = '';
    level5Input.value = '';
    displayRecords();
  }
});

// Edit a record
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  rgnumberInput.value = recordToEdit.rgnumber;
  level3Input.value = recordToEdit.level3;
  level4Input.value = recordToEdit.level4;
  level5Input.value = recordToEdit.level5;
  editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
  displayRecords();
  let delBtn = document.querySelectorAll('.deleteButton');
  console.log(delBtn);
  delBtn[
    index
  ].innerHTML = `<i id="yesBtn" onclick="confirmDelete(${index})" class="fa-solid fa-check"></i><i id="noBtn" onclick="resetDelete(${index})" class="fa-solid fa-xmark"></i>`;
}

function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function resetDelete(index) {
  displayRecords();
}

// Initial display
displayRecords();