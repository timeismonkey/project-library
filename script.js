const libraryBody = document.querySelector('.library-body');
const addBookBtn = document.querySelector('#add-book');
const bookDialog = document.querySelector('#book-dialog');
const bookForm = document.querySelector('#book-form');
const cancelModal = document.querySelector('#cancel-button');
const confirmModal = document.querySelector('#confirm-button');

const myLibrary = [];
console.log(myLibrary);

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
    // Deal with form input
    const inputs = bookForm.querySelectorAll('input');
    const title = inputs[0].value;
    const author = inputs[1].value;
    const pages = inputs[2].value;
    const read = bookForm.querySelector('#read').value === 'No' ? false : true;
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

// Display books in table on page
function displayBooks() {
    myLibrary.forEach(
        (book) =>
            (libraryBody.innerHTML += `<tr><td>${book.title}</td><td>${
                book.author
            }</td><td>${book.pages}</td><td>${
                book.read ? 'yes' : 'no'
            }</td></tr>`)
    );
}

addBookBtn.addEventListener('click', () => bookDialog.showModal());
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});
cancelModal.addEventListener('click', (e) => {
    e.preventDefault();
    bookDialog.close();
});
confirmModal.addEventListener('click', (e) => bookDialog.close())


// Test

// Add test books
// const book1 = new Book('Book1', 'me', 30, false);
// const book2 = new Book('Book2', 'you', 35, true);
// const book3 = new Book('Book3', 'we', 40, false);
// const book4 = new Book('Book4', 'he', 45, false);

// myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);
// myLibrary.push(book4);

displayBooks();