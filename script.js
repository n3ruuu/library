const addButton = document.querySelector('header button')
const modal = document.getElementById('modal')
const cancelButton = document.getElementById('cancel-btn')
const tableBody = document.querySelector('tbody')
const addBook = document.getElementById('add-btn')
const inputs = document.querySelectorAll('input')
const select = document.querySelector('select')

const library = [
    {
        title: 'Naruto',
        author: 'Masashi Kishimoto',
        chapters: '700', 
        status: 'Finished'
    }, 
    {
        title: 'One Piece',
        author: 'Eiichiro Oda',
        chapters: '1058', 
        status: 'Not Finished'
    }
]

const displayBooks = () => {
    tableBody.innerHTML = ''
    library.forEach(book => {
        const bookInfo =
            `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.chapters}</td>
                <td><button class="status">${book.status}</button></td>
                <td><img src="assets/bin.svg" class="delete"></td>
            </tr>`
        tableBody.insertAdjacentHTML("beforeend", bookInfo)
    })

    const deleteButtons = document.querySelectorAll('.delete')
    deleteButtons.forEach(button => button.addEventListener('click', deleteBook))

    const statusButtons = document.querySelectorAll('.status')
    statusButtons.forEach(button => {
        setStatusButton(button)
        button.addEventListener('click', toggleStatus)
    })
}

function Book(title, author, chapters, status) {
    this.title = title,
    this.author = author,
    this.chapters = chapters, 
    this.status = status 
}

const addBookToLibrary = (e) => {
    const newBook = new Book(title.value, author.value, chapters.value, select.value)
    
    if (title.value === '' || author.value === '' || chapters.value === '') return

    for (const book of library) {
        if (book.title === title.value) {
            alert(`${title.value} already exists in your library!`)
            clearInputs()
            e.preventDefault()
            return
        }
    }
    library.push(newBook)
    updateLibrary()
    clearInputs()
    hideModal()
    e.preventDefault()
}

const updateLibrary = () => {
    displayBooks()
    alert(`${title.value} is added successfully!`)
}

const clearInputs = () => {
    inputs.forEach(input => input.value = '')
}

const deleteBook = (e) => {
    const row = e.target.parentNode.parentNode
    if (e.target.className === "delete") {
        row.remove()
    }
}

const showModal = () => {
    modal.style.display = 'block'
}

const hideModal = () => {
    modal.style.display = 'none'
}

const setStatusButton = (button) => {
    if (button.textContent === 'Finished') {
        button.style.backgroundColor = '#9fff9c'
        button.style.color = 'black'
    } else {
        button.style.backgroundColor = '#f0eef1'
        button.style.color = 'black'
    }
}

const toggleStatus = (e) => {
    const button = e.target
    const statusValue = e.target.textContent
    console.log(statusValue)
    if (statusValue === "Finished") {
        e.target.textContent = "Not Finished"
    } else if (statusValue === "Not Finished") {
        e.target.textContent = "Finished"
    }
    setStatusButton(button)
}

addBook.addEventListener('click', addBookToLibrary)
addButton.addEventListener('click', showModal)
cancelButton.addEventListener('click', hideModal)

displayBooks()