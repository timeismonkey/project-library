const myLibrary = [];
const libraryBody = document.querySelector('.library-body');
const bookDialog = document.querySelector('#book-dialog');

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
    // do stuff here
}

function showDialog () {
    
}

// Display books in table on page
function displayBooks() {
    myLibrary.forEach(
        (book) =>
            (libraryBody.innerHTML += `<tr><td>${book.title}</td><td>${
                book.author
            }</td><td>${book.pages}</td><td>${
                book.read ? 'Yes' : 'No'
            }</td></tr>`)
    );
}




// Test

// Add test books
const book1 = new Book('Book1', 'me', 30, false);
const book2 = new Book('Book2', 'you', 35, true);
const book3 = new Book('Book3', 'we', 40, false);
const book4 = new Book('Book4', 'he', 45, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

displayBooks();