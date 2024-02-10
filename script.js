const libraryBody = document.querySelector('.library-body');
const cardContainer = document.querySelector('.card-container');
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

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary() {
    const inputs = bookForm.querySelectorAll('input');
    const title = inputs[0].value;
    const author = inputs[1].value;
    const pages = inputs[2].value;
    const read = bookForm.querySelector('#read').value === 'no' ? false : true;

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    return book;
}

function removeBookFromLibrary(bookElement) {
    let bookIndex = bookCard.dataset.index;
    myLibrary.splice(bookIndex, 1);
}

function displayBook(book) {
    cardContainer.appendChild(createBookCard(book));
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    const bookCardTitle = document.createElement('p');
    const bookCardAuthor = document.createElement('p');
    const bookCardPages = document.createElement('p');
    const bookCardRead = document.createElement('p');

    bookCard.setAttribute('class', 'book-card');
    bookCardTitle.setAttribute('class', 'book-card-title');
    bookCardAuthor.setAttribute('class', 'book-card-author');
    bookCardPages.setAttribute('class', 'book-card-pages');
    bookCardRead.setAttribute('class', 'book-card-read');

    bookCardTitle.textContent = `Title: ${book.title}`;
    bookCardAuthor.textContent = `Author: ${book.author}`;
    bookCardPages.textContent = `Pages: ${book.pages}`;
    bookCardRead.textContent = book.read ? 'Read: Yes' : 'Read: No';

    bookCard.appendChild(bookCardTitle);
    bookCard.appendChild(bookCardAuthor);
    bookCard.appendChild(bookCardPages);
    bookCard.appendChild(bookCardRead);

    const bookCardButtons = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    removeBtn.setAttribute('class', 'book-button');
    readBtn.setAttribute('class', 'book-button');
    removeBtn.setAttribute('id', 'remove-button');
    readBtn.setAttribute('id', 'read-button');

    removeBtn.textContent = 'Remove';
    readBtn.textContent = 'Read';

    removeBtn.addEventListener('click', (event) => {
        const targetBookCard = event.target.parentElement.parentElement;
        console.log(targetBookCard);
        removeBookFromLibrary(targetBookCard);
        // Remove book from card-container
        cardContainer.removeChild(targetBookCard);
    });
    readBtn.addEventListener('click', updateReadStatus);

    bookCard.appendChild(removeBtn);
    bookCard.appendChild(readBtn);

    return bookCard
} 

function updateReadStatus(event) {
    let bookRow = event.target.parentElement;
    let bookIndex = bookRow.dataset.index;
    let readTableDataElement = bookRow.querySelector('#read-table-data');
    let book = myLibrary[bookIndex];
    book.toggleRead();
    readTableDataElement.textContent = book.read ? 'Yes' : 'No';
}


addBookBtn.addEventListener('click', () => {
    bookForm.reset();
    bookDialog.showModal()
});

// Deal with submission of bookForm data
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let book = addBookToLibrary();
    displayBook(book);
});

cancelModal.addEventListener('click', (e) => {
    e.preventDefault();
    bookDialog.close();
});

confirmModal.addEventListener('click', (e) => {
    if (bookForm.checkValidity()) {
        bookDialog.close();
    }
});

// Deal with 'Enter' key being used to close modal
bookForm.addEventListener('keypress', (event) => {
    let key = event.which || event.keyCode;
    if (key === 13) {
        event.preventDefault();

        if (bookForm.reportValidity()) {
            bookForm.dispatchEvent(new Event('submit'));
            bookDialog.close();
        }
    }
});

// This function will be more useful once we are pulling data from a db
// It will show the initial books in db, when page loads
// function displayBooks() {
//     myLibrary.forEach((book) => libraryBody.appendChild(createBookRow(book)))
// }
