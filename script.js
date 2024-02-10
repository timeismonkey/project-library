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
    const index = myLibrary.push(book); - 1;

    return [book, index];
}

function removeBookFromLibrary(bookCard) {
    let bookIndex = bookCard.dataset.index;
    myLibrary.splice(bookIndex, 1);
}

function displayBook(book, index) {
    cardContainer.appendChild(createBookCard(book, index));
}

function displayBooks() {
    cardContainer.innerHTML = '';
    myLibrary.forEach((book) => cardContainer.appendChild(createBookCard(book)))
}


function createBookCard(book, index) {
    const bookCard = document.createElement('div');
    bookCard.setAttribute('class', 'book-card');

    const bookCardTitle = document.createElement('p');
    const bookCardAuthor = document.createElement('p');
    const bookCardPages = document.createElement('p');
    const bookCardRead = document.createElement('p');

    // Associate card wih index of book in myLibrary
    bookCard.dataset.index = index;

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
        removeBookFromLibrary(targetBookCard);
        // Remove book from card-container
        cardContainer.removeChild(targetBookCard);
    });
    readBtn.addEventListener('click', (event) => {
        targetBookCard = event.target.parentElement.parentElement;
        updateReadStatus(targetBookCard);
    });

    bookCardButtons.appendChild(removeBtn);
    bookCardButtons.appendChild(readBtn);

    bookCard.appendChild(bookCardButtons);

    return bookCard;
}


function updateReadStatus(bookCard) {
    let bookIndex = bookCard.dataset.index;
    let bookCardRead = bookCard.querySelector('.book-card-read');
    let book = myLibrary[bookIndex];
    book.toggleRead();
    bookCardRead.textContent = book.read ? 'Read: Yes' : 'Read: No';
}

addBookBtn.addEventListener('click', () => {
    bookForm.reset();
    bookDialog.showModal();
});

// Deal with submission of bookForm data
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const [book, index] = addBookToLibrary();
    displayBook(book, index);
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