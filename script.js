const libraryBody = document.querySelector('.library-body');
const addBookBtn = document.querySelector('#add-book');
const bookDialog = document.querySelector('#book-dialog');
const bookForm = document.querySelector('#book-form');
const cancelModal = document.querySelector('#cancel-button');
const confirmModal = document.querySelector('#confirm-button');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return read
        ? `${this.title} by ${this.author}, ${this.pages} pages, read`
        : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
};

function addBookToLibrary() {
    const inputs = bookForm.querySelectorAll('input');
    const title = inputs[0].value;
    const author = inputs[1].value;
    const pages = inputs[2].value;
    const read = bookForm.querySelector('#read').value === 'no' ? false : true;    
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    return book
}

function displayBook(book) {
    libraryBody.appendChild(createBookRow(book));
}

// Display books in table on page
function createBookRow(book) {
    const tr = document.createElement('tr');
    // Associate row with index of book in library
    tr.dataset.index = myLibrary.length - 1;

    const titleTd = document.createElement('td');
    tr.appendChild(titleTd);
    titleTd.textContent = book.title;


    const authorTd = document.createElement('td');
    tr.appendChild(authorTd);
    authorTd.textContent = book.author;

    const pagesTd = document.createElement('td');
    tr.appendChild(pagesTd);
    pagesTd.textContent = book.pages;

    const readTd = document.createElement('td');
    tr.appendChild(readTd);
    readTd.textContent = book.read ? 'Yes' : 'No';

    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    readBtn.textContent = 'Read';
    removeBtn.setAttribute('class', 'book-button');
    readBtn.setAttribute('class', 'book-button');
    removeBtn.setAttribute('id', 'remove-button');
    readBtn.setAttribute('id', 'read-button');
    tr.appendChild(removeBtn);
    tr.appendChild(readBtn);

    return tr
}

addBookBtn.addEventListener('click', () => bookDialog.showModal());

// Deal with submission of bookForm data
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let book = addBookToLibrary();
    displayBook(book);

    // Clear form data
    let bookFormInputs = bookForm.querySelectorAll('input');
    let bookFormSelects = bookForm.querySelector('select');
    bookFormInputs.forEach((input) => input.value = '');
    bookFormSelects.selectedIndex = 1;    
});

cancelModal.addEventListener('click', (e) => {
    e.preventDefault();
    bookDialog.close();
});

confirmModal.addEventListener('click', (e) => {
    bookDialog.close()
});

// Deal with 'Enter' key being used to close modal
bookDialog.addEventListener('keypress', (event) => {
    let key = event.which || event.keyCode;
    if (key === 13) {
        event.preventDefault();
        bookForm.dispatchEvent(new Event('submit'));
        bookDialog.close();
    }
})


// This function will be more useful once we are pulling data from a db
// It will show the initial books in db, when page loads
// function displayBooks() {
//     myLibrary.forEach((book) => libraryBody.appendChild(createBookRow(book)))
// }