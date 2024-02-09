const myLibrary = [];

const librarySection = document.getElementById('library');
let viewButton = document.getElementById('viewButton');

viewButton.addEventListener("click", displayBooks);

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        if (this.read == true){
            readStatement = "has been read."
        }
        else{
            readStatement= "not read yet."
        }
        return `${this.title} by ${this.author}, ${this.pages}, ${readStatement}`;
    }
}


function addBookToLibrary(book){
    myLibrary.push(book);
}

function displayBooks(){
    librarySection.innerHTML = "";
    myLibrary.forEach(displayBookOnPage);
}

function displayBookOnPage(libraryBook){
    let libBook = librarySection.appendChild(document.createElement('div'));
    libBook.classList.add('book');
    let bookTitle = libBook.appendChild(document.createElement('div'));
    let bookAuthor = libBook.appendChild(document.createElement('div'));
    let bookPages = libBook.appendChild(document.createElement('div'));
    let bookRead = libBook.appendChild(document.createElement('div'));

    bookTitle.innerHTML = libraryBook.title;
    bookAuthor.innerHTML = libraryBook.author;
    bookPages.innerHTML = libraryBook.pages;
    bookRead.innerHTML = libraryBook.read;

}


// Test section to add books to library:
let book1 = new Book('Uno', 'Chiraag', 456, true);
let book2 = new Book('Duo', 'Chiraag', 345, true);
let book3 = new Book('Thres', 'Chiraag', 200, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);