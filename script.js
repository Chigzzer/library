const myLibrary = [];

// Creating html handlers
const librarySection = document.getElementById('library');
const dialog = document.querySelector("dialog");
const form = document.querySelector("#newBookForm");
const showButton = document.querySelector("#showDialog");
const cancelButton = document.querySelector("#cancel");
const addBookButton = document.querySelector("#addBookButton");

// Functions to open, submit and close the dialog box
showButton.addEventListener("click", () =>{
    dialog.showModal();
});

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    dialog.close();
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

    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    addBookToLibrary(newBook);
    form.reset();
    dialog.close();
}

//Function that appends the new book into user's library
function addBookToLibrary(book){
    myLibrary.push(book);
    displayBooks();
}

// Function that removes the book from the user's library and refreshes the page.
function removeBookFromLibrary(bookIndex){
    console.log("");
    myLibrary.splice(bookIndex, 1);
    displayBooks();
}

//Function that looks at the user's library and displays the books onto the screen.
function displayBooks(){
    librarySection.innerHTML = "";
    myLibrary.forEach((libraryBook, index) => {
        let libBook = librarySection.appendChild(document.createElement('div'));
        libBook.classList.add('book');
        libBook.dataset.bookIndex = index;

        let bookTitle = libBook.appendChild(document.createElement('div'));
        bookTitle.classList.add('bookTitle');
        bookTitle.classList.add('book-group');
        let bookTitleHeader = bookTitle.appendChild(document.createElement('div'));    
        let bookTitleValue = bookTitle.appendChild(document.createElement('div'));    
        bookTitleHeader.classList.add('book-header');
        bookTitleValue.classList.add('book-value');

        let bookAuthor = libBook.appendChild(document.createElement('div'));
        bookAuthor.classList.add('bookAuthor');
        bookAuthor.classList.add('book-group');
        let bookAuthorHeader = bookAuthor.appendChild(document.createElement('div'));    
        let bookAuthorValue = bookAuthor.appendChild(document.createElement('div'));
        bookAuthorHeader.classList.add('book-header');
        bookAuthorValue.classList.add('book-value');

        let bookPages = libBook.appendChild(document.createElement('div'));
        bookPages.classList.add('bookPages');
        bookPages.classList.add('book-group');
        let bookPagesHeader = bookPages.appendChild(document.createElement('div'));    
        let bookPagesValue = bookPages.appendChild(document.createElement('div'));
        bookPagesHeader.classList.add('book-header');
        bookPagesValue.classList.add('book-value');

        let buttonGroup = libBook.appendChild(document.createElement('div'));
        let bookRead = buttonGroup.appendChild(document.createElement('Button'));
        bookRead.classList.add('bookRead');
        displayBookRead(libraryBook, bookRead);
        
        bookRead.addEventListener("click", function(){
            if (libraryBook.read == true){
                libraryBook.read = false;
            }
            else{
                libraryBook.read=true;
            }
            displayBookRead(libraryBook, bookRead);
        })

        let removeBook = buttonGroup.appendChild(document.createElement('button'));
        removeBook.classList.add('remove');
        removeBook.innerText = "Delete Book";
        removeBook.addEventListener("click", function(){removeBookFromLibrary(index)});

        bookTitleHeader.innerText = "Book Title:";
        bookTitleValue.innerText = libraryBook.title;
        bookAuthorHeader.innerText = "Book Author:";
        bookAuthorValue.innerText = libraryBook.author;
        bookPagesHeader.innerText = "Book Pages:"; 
        bookPagesValue.innerText = libraryBook.pages;
    }
    )
}

function displayBookRead(book, bookChangeButton){
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

//addBookToLibrary(book1);
//addBookToLibrary(book2);
//addBookToLibrary(book3);