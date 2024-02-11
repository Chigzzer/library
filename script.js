const myLibrary = [];

// Creating html handlers
const librarySection = document.getElementById('library');
const bookDialog = document.querySelector("#bookDialog");
const form = document.querySelector("#newBookForm");
const showButton = document.querySelector("#showDialog");
const cancelButton = document.querySelector("#cancel");
const addBookButton = document.querySelector("#addBookButton");
const bookDetails = document.querySelector("#bookDetailPopUp");
const popUpBox = document.querySelector("#bookDetailPopUp");
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
    let newBookTitle = document.querySelector("#newBookTitle").value;
    let newBookAuthor = document.querySelector("#newBookAuthor").value;
    let newBookPages = document.querySelector("#newBookPages").value;
    let newBookRead = document.querySelector("#newBookRead").checked;
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
function removeBookFromLibrary(bookIndex){

    console.log("removing index: " + bookIndex);
    console.log(typeof bookIndex);

    //myLibrary.splice(bookIndex, 0);
    //console.log(myLibrary);
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


    // Removal has a bug. This gets called as many times as you have opened the box.
    // Possibly the pop up has created multiple instances?
    removeButton.addEventListener("click", (index) => {
        console.log("----");
        console.log(myLibrary);
        console.log(indexDelete);
        console.log("----");
        
        //myLibrary.splice(index, 1);
        //displayBooks();
    });



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

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);