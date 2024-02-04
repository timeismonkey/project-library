const myLibrary = [];
const d

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = () => read ? `${this.title} by ${this.author}, ${this.pages} pages, read` : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
}

Book.prototype.info = function () {
    return read
        ? `${this.title} by ${this.author}, ${this.pages} pages, read`
        : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
};

function addBookToLibrary() {
    // do stuff here
    // Take users form input and create a book object from it
    // Add the book to library
}

// Display books in library on page
function displayBooks() {
    myLibrary.forEach()
} 

// Test

// Add test books
const book1 = new Book('Book1', 'me', 30, false);
const book2 = new Book('Book2', 'you', 35, true);
const book3 = new Book('Book3', 'we', 40, false);
const book4 = new Book('Book4', 'he', 45, false);

myLibrary.push(book1)
myLibrary.push(book2)
myLibrary.push(book3)
myLibrary.push(book4)