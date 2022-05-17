var selectedRow = null;

function onFormSubmit() {
    console.log(formData);
    if (validate()) {
        var formData = readFormData();
        console.log(formData);
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }

        resetForm();
    }
}

function readFormData() {

    var formData = {};
    formData["fullname"] = document.getElementById("fullname").value;
    formData["code"] = document.getElementById("code").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["address"] = document.getElementById("address").value;
    formData["class"] = document.getElementById("class").value;
    formData["school"] = document.getElementById("school").value;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("emplist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell2 = newRow.insertCell(0);
    cell2.innerHTML = data.code;

    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.fullname;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.address;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.class;

    cell4 = newRow.insertCell(5);
    cell4.innerHTML = data.school;

    cell4 = newRow.insertCell(6);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a  onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById('code').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('address').value = '';
    document.getElementById('class').value = '';
    document.getElementById('school').value = '';
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('code').value = selectedRow.cells[0].innerHTML;
    document.getElementById('fullname').value = selectedRow.cells[1].innerHTML;
    document.getElementById('gender').value = selectedRow.cells[2].innerHTML;
    document.getElementById('address').value = selectedRow.cells[3].innerHTML;
    document.getElementById('class').value = selectedRow.cells[4].innerHTML;
    document.getElementById('school').value = selectedRow.cells[5].innerHTML;
}

function updateRecord(formData) {

    selectedRow.cells[0].innerHTML = formData.code;
    selectedRow.cells[1].innerHTML = formData.fullname;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.address;
    selectedRow.cells[4].innerHTML = formData.class;
    selectedRow.cells[5].innerHTML = formData.school;

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById("emplist").deleteRow(row.rowIndex);
        resetForm();
    }

}

function validate() {
    isValid = true;
    if (document.getElementById('fullname').value == "") {
        isValid = false;
        document.getElementById('fullNameValidationError').classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById('fullNameValidationError').classList.remove("hide")) {
            document.getElementById('fullNameValidationError').classList.add("hide");
        }
    }

    return isValid;
}