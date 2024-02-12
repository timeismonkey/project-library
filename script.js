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
    const index = myLibrary.push(book) - 1;

    return [book, index];
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function updateReadStatus(book, bookCardRead) {
    book.toggleRead();
    bookCardRead.textContent = book.read ? 'Read: Yes' : 'Read: No';
}

function displayBook(book, index) {
    cardContainer.appendChild(createBookCard(book, index));
}

function displayBooks() {
    cardContainer.innerHTML = '';
    myLibrary.forEach((book, index) =>
        cardContainer.appendChild(createBookCard(book, index))
    );
}

function createBookCard(book, index) {
    const bookCard = document.createElement('div');
    bookCard.setAttribute('class', 'book-card');
    bookCard.dataset.index = index;

    const bookInfoCont = document.createElement('div');
    bookInfoCont.setAttribute('class', 'book-info-cont');

    const bookCardTitle = document.createElement('p');
    bookCardTitle.setAttribute('class', 'book-info');
    bookCardTitle.innerHTML = `<span class='book-info-heading' id='title'>Title:</span> ${book.title}`;
    bookInfoCont.appendChild(bookCardTitle);

    const bookCardAuthor = document.createElement('p');
    bookCardAuthor.setAttribute('class', 'book-info');
    bookCardAuthor.innerHTML = `<span class='book-info-heading' id='author'>Author:</span> ${book.author}`;
    bookInfoCont.appendChild(bookCardAuthor);

    const bookCardPages = document.createElement('p');
    bookCardPages.setAttribute('class', 'book-info');
    bookCardPages.innerHTML = `<span class='book-info-heading' id='pages'>Pages:</span> ${book.pages}`;
    bookInfoCont.appendChild(bookCardPages);

    const bookCardRead = document.createElement('p');
    bookCardRead.setAttribute('class', 'book-info');
    bookCardRead.innerHTML = `<span class='book-info-heading' id='read'>Read:</span> ${(book.read ? 'Yes' : 'No')}`;
    bookInfoCont.appendChild(bookCardRead);

    bookCard.appendChild(bookInfoCont);

    const bookCardButtons = document.createElement('div');
    bookCardButtons.setAttribute('class', 'book-card-buttons');

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', 'remove-button');
    removeBtn.setAttribute('class', 'book-button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', (e) => removeBook(index));

    const readBtn = document.createElement('button');
    readBtn.setAttribute('class', 'book-button');
    readBtn.setAttribute('id', 'read-button');
    readBtn.textContent = 'Read';
    readBtn.addEventListener('click', (e) =>
        updateReadStatus(book, bookCardRead)
    );

    bookCardButtons.appendChild(removeBtn);
    bookCardButtons.appendChild(readBtn);
    bookCard.appendChild(bookCardButtons);

    return bookCard;
}

addBookBtn.addEventListener('click', () => {
    bookForm.reset();
    bookDialog.showModal();
});

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
            // Create a new submit event
            const submitEvent = new Event('submit', {
                cancelable: true,
            });

            // Dispatch the submit event on the form element
            bookForm.dispatchEvent(submitEvent);
            bookDialog.close();
        }
    }
});
