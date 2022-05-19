'use strict'

const openModel = () => document.getElementById('model').classList.add('active')

const closeModel = () => {
    clearFields()
    document.getElementById('model').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_sai'))??[]

const setLocalStorage = (db_sai) => localStorage.setItem('db_sai', JSON.stringify(db_sai))

const readSai = () => getLocalStorage()

const createSai = (sai) => {
    const db_sai = getLocalStorage()
    db_sai.push(sai)
    setLocalStorage(db_sai)
}

const updateSai = (index, sai) => {
    const db_sai = readSai()
    db_sai[index] = sai
    setLocalStorage(db_sai)
}


const deleteSai = (index) => {
    const db_sai = readSai()
    db_sai.splice(index, 1)
    setLocalStorage(db_sai)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.model-field')
    fields.forEach(field => field.value = "")
}

const saveSai = () => {
    if (isValidFields()) {
        const sai = {
                /*  name: document.getElementById('name').value,
                 email: document.getElementById('email').value,
                 phone: document.getElementById('phone').value,
                 fees: document.getElementById('fees').value,
                 level: document.getElementById('level').value,
                 school: document.getElementById('school').value, */
                name: document.getElementById('name').value,
                project: document.getElementById('project').value,
                date: document.getElementById('date').value,
                address: document.getElementById('address').value,
                réalisateur: document.getElementById('réalisateur').value,
                caméraman: document.getElementById('caméraman').value,
            }
            //console.log('The Cadastral student: ' + student)
        const index = document.getElementById('name').dataset.index
        if (index == 'new') {
            createSai(sai)
            listSai()
            closeModel()
        } else {
            updateSai(index, sai)
            listSai()
            closeModel()
        }
    }
}


const createRow = (sai, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML =
        /* `
				<td>${student.name}</td>
				<td>${student.email}</td>
				<td>${student.phone}</td>
				<td>${student.fees}</td>
				<td>${student.level}</td>
				<td>${student.school}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Edit</button>
					<button type="button" class="button red" id="delete-${index}">Delete</button>
				</td>
			` */
        `
				<td>${sai.name}</td>
				<td>${sai.project}</td>
				<td>${sai.date}</td>
				<td>${sai.address}</td>
				<td>${sai.réalisateur}</td>
				<td>${sai.caméraman}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Edit</button>
					<button type="button" class="button red" id="delete-${index}">Delete</button>
				</td>
			`
    document.querySelector('#tblSai>tbody').appendChild(newRow)
}

const crearTable = () => {
    const rows = document.querySelectorAll('#tblSai>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const listSai = () => {
    const students = readSai()
        // console.log(students)
    crearTable()
    students.forEach(createRow)
}

const fillFields = (sai) => {
    /* 
        document.getElementById('name').value = student.name
        document.getElementById('email').value = student.email
        document.getElementById('phone').value = student.phone
        document.getElementById('fees').value = student.fees
        document.getElementById('level').value = student.level
        document.getElementById('school').value = student.school */

    document.getElementById('name').value = sai.name
    document.getElementById('project').value = sai.project
    document.getElementById('date').value = sai.date
    document.getElementById('address').value = sai.address
    document.getElementById('réalisateur').value = sai.réalisateur
    document.getElementById('caméraman').value = sai.caméraman

    document.getElementById('name').dataset.index = sai.index
}

const editSai = (index) => {
    const sai = readSai()[index]
    sai.index = index
    fillFields(sai)
    openModel()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editSai(index)
        } else {
            const sai = readSai()[index]
            const response = confirm(`Are you sure to delete this record ${sai.name}`)
            if (response) {
                deleteSai(index)
                listSai()
            }
        }
    }
}

listSai()

document.getElementById('idSai').addEventListener('click', openModel)
document.getElementById('modelClose').addEventListener('click', closeModel)
document.getElementById('save').addEventListener('click', saveSai)
document.querySelector('#tblSai>tbody').addEventListener('click', editDelete)