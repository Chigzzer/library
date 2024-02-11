const myLibrary = [];

// Creating html handlers
const librarySection = document.getElementById('library');
const bookDialog = document.querySelector("#book-dialog");
const form = document.querySelector("#new-book-form");
const showButton = document.querySelector("#show-dialog");
const cancelButton = document.querySelector("#cancel");
const addBookButton = document.querySelector("#add-book-button");
const bookDetails = document.querySelector("#book-detail-popup");
const popUpBox = document.querySelector("#book-detail-popup");
const closePopupButton = document.querySelector("#close-popup");

let indexDelete;

closePopupButton.addEventListener("click", () => {
    bookDetails.classList.remove('show');
    bookDetails.classList.add('hide');})

// Functions to open, submit and close the dialog box
showButton.addEventListener("click", () =>{
    bookDialog.showModal();
});

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    bookDialog.close();
})

addBookButton.addEventListener("click", createBook);

// Initial construct of the Book object
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

// Function to create a new book based on the user's input
function createBook(event){
    event.preventDefault();
    let newBookTitle = document.querySelector("#new-book-title").value;
    let newBookAuthor = document.querySelector("#new-book-author").value;
    let newBookPages = document.querySelector("#new-book-pages").value;
    let newBookRead = document.querySelector("#new-book-read").checked;
    console.log(newBookPages);
    if ((newBookTitle == "") || (newBookAuthor == "")){
        alert("Please make sure the book's title, author and number of pages is entered."); 
        return;
    }

    if (typeof Number(newBookPages) != 'number' || newBookPages == "" || newBookPages < 0){
        alert("Please make sure the number of pages is correct");
        return;
    }

    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    addBookToLibrary(newBook);
    form.reset();
    bookDialog.close();
}

//Function that appends the new book into user's library
function addBookToLibrary(book){
    myLibrary.push(book);
    displayBooks();
}

// Function that removes the book from the user's library and refreshes the page.
function removeBookFromLibrary(){
    myLibrary.splice(indexDelete, 1); 
    displayBooks();
}

// Displaying each book with their title only
function displayBooks(){
    bookDetails.classList.remove('show');
    bookDetails.classList.add('hide');
    librarySection.innerHTML = "";
    myLibrary.forEach((libraryBook, index) =>{
        let libBook = librarySection.appendChild(document.createElement('div'));
        libBook.classList.add('book');
        libBook.dataset.bookIndex = index;
        let bookTitle = libBook.appendChild(document.createElement('div'));
        bookTitle.innerText = libraryBook.title;
        libBook.addEventListener("click", function(){       
        displayBookDetails(libraryBook, index)
    });
})}

// Function to open the pop up with the book details.
function displayBookDetails(libraryBook, index){
    console.log("Index of book: " + index);
    indexDelete = index;
    let bookAuthor = libraryBook.author;
    let bookTitle = libraryBook.title;
    let bookPages = libraryBook.pages;
    let bookRead = libraryBook.read;

    let bookTitleValue = document.querySelector('#book-title-value');
    let bookAuthorValue = document.querySelector('#book-author-value');
    let bookPagesValue = document.querySelector('#book-pages-value');
    let bookReadButton = document.querySelector('#book-read');
    let removeButton = document.querySelector('#delete-book');


    displayBookRead(libraryBook, bookReadButton);
    bookReadButton.addEventListener("click", function(){
        if (libraryBook.read == true){
            libraryBook.read = false;
        }
        else{
            libraryBook.read=true;
        }
        displayBookRead(libraryBook, bookReadButton);
    })



    bookTitleValue.innerText = bookTitle;
    bookAuthorValue.innerText = bookAuthor;
    bookPagesValue.innerText = bookPages;


    bookDetails.classList.remove('hide');
    bookDetails.classList.add('show');
}

function deleteTest(){
    console.log(indexDelete);
}


function displayBookRead(book, bookChangeButton){
    console.log("TEST");
    console.log(book.read);
    bookChangeButton.classList.toggle('book-read');
    if (book.read == true){
        bookChangeButton.innerText = "Read";
        bookChangeButton.classList.add('book-read');
        
    }
    else{
        bookChangeButton.innerText = "Not read";
        bookChangeButton.classList.remove('book-read');
    }
}


// Test section to add books to library:
let book1 = new Book('Uno', 'Chiraag', 456, true);
let book2 = new Book('Duo', 'Chiraag', 345, true);
let book3 = new Book('Thres', 'Chiraag', 200, false);
let book4 = new Book('Thres', 'Chiraag', 200, false);
let book5 = new Book('Thres', 'Chiraag', 200, false);
let book6 = new Book('Thres', 'Chiraag', 200, false);
let book7 = new Book('Thres', 'Chiraag', 200, false);
let book8 = new Book('Thres', 'Chiraag', 200, false);
let book9 = new Book('Thres', 'Chiraag', 200, false);
let book10 = new Book('Thres', 'Chiraag', 200, false);
let book11= new Book('Thres', 'Chiraag', 200, false);
let book12= new Book('Thres', 'Chiraag', 200, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
addBookToLibrary(book7);
addBookToLibrary(book8);
addBookToLibrary(book9);
addBookToLibrary(book10);
addBookToLibrary(book11);
addBookToLibrary(book12);