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
const stars = document.querySelectorAll(".star");
const initialStars = document.querySelectorAll(".initial-star");
let indexDelete;
let initialStarRating = 0;
let currentOpenBook;

// Functions to open, submit and close the dialog box
showButton.addEventListener("click", () =>{
    bookDialog.showModal();
});

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    clearRating();
    bookDialog.close();
})

addBookButton.addEventListener("click", createBook);

// Initial construct of the Book object
function Book(title, author, pages, read, rating){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
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

    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead, initialStarRating);
    addBookToLibrary(newBook);
    clearRating();
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
    // bookDetailsToggle();
    librarySection.innerHTML = "";
    myLibrary.forEach((libraryBook, index) =>{
        createBookDetail(libraryBook, index);       
    });
}

// Functions to populate the book details for each book
function createBookDetail(libraryBook, index){
    let libBook = librarySection.appendChild(document.createElement('div'));
    let bookTitle = libBook.appendChild(document.createElement('div'));
    libBook.classList.add('book');
    libBook.dataset.bookIndex = index;
    bookTitle.innerText = libraryBook.title;
    libBook.addEventListener("click", function(){       
    displayBookDetails(libraryBook, index);
})
}
// Function to open the pop up with the book details.
function displayBookDetails(libraryBook, index){
    indexDelete = index;
    currentOpenBook = libraryBook;
    let bookAuthor = libraryBook.author;
    let bookTitle = libraryBook.title;
    let bookPages = libraryBook.pages;
    let bookRatingDetail = libraryBook.rating;
    let bookTitleValue = document.querySelector('#book-title-value');
    let bookAuthorValue = document.querySelector('#book-author-value');
    let bookPagesValue = document.querySelector('#book-pages-value');
    let bookReadButton = document.querySelector('#book-read');
   
    displayBookRead(libraryBook, bookReadButton);
    bookReadButton.addEventListener("click", function(){
        toggleReadState(libraryBook);
        displayBookRead(libraryBook, bookReadButton);
    })

    bookTitleValue.innerText = bookTitle;
    bookAuthorValue.innerText = bookAuthor;
    bookPagesValue.innerText = bookPages;
    clearRating();
    displayBookRating(bookRatingDetail);
    bookDetailsToggle();
}

// Functions to close the details section
document.addEventListener("keydown", ({key}) => {
    if (key == "Escape"){
        bookDetails.classList.remove('show');
    }
} )

closePopupButton.addEventListener("click", () => {
    bookDetailsToggle();
    }
)

function bookDetailsToggle(){
    bookDetails.classList.toggle('show');
}

function toggleReadState(book){
    if (book.read == true){
        book.read = false;
    }
    else{
        book.read = true;
    }
}

function displayBookRead(book, bookChangeButton){
    if (book.read == true){
        bookChangeButton.innerText = "Read";
        bookChangeButton.classList.add('book-read');
        
    }
    else{
        bookChangeButton.innerText = "Not read";
        bookChangeButton.classList.remove('book-read');
    }
}

// COde for the rating system.
stars.forEach((star) =>{
    console.log(star);
    star.addEventListener("click", function(){
        getStarInfo(star);
    });
})

function getStarInfo(star){
    let bookRating = star.dataset.rating;
    changeBookRating(bookRating);
}

function changeBookRating(rating){
    currentOpenBook.rating = rating;
    clearRating();
    displayBookRating(rating);
} 

function clearRating(){
    for (let i=1; i < 6; ++i){
        //console.log(i);
        let starChange = document.getElementById(`${i}-star-img`);
        let starChangeInitial = document.getElementById(`${i}-star-initial-img`);
        starChange.src="images/star-outline.svg";
        starChangeInitial.src="images/star-outline.svg";
    }
}

function displayBookRating(ratingValue){
    if (Number(ratingValue) <= 0 || isNaN(ratingValue)){
    clearRating();
    return;
    }
    if (Number(ratingValue) > 5){ratingValue = 5}; 
    
    for (let j=1; j < Number(ratingValue)+1; ++j){
        //console.log(j);
        let starChange = document.getElementById(`${j}-star-img`);
        starChange.src="images/star.svg";
    }
}

initialStars.forEach((star)=> {
    star.addEventListener("click", function(){
        setInitialRating(star);
    })
})

function setInitialRating(star){
    let initialRating = star.dataset.rating;
    if (Number(initialRating) > 5){initialRating = 5}; 
    clearRating();
    displayInitialRating(initialRating);
    initialStarRating = Number(initialRating);
}

function displayInitialRating(ratingValue){
    if (ratingValue == '0'){
    clearRating();
    return;
    }
    for (let j=1; j < Number(ratingValue)+1; ++j){
        //console.log(j);
        let starChange = document.getElementById(`${j}-star-initial-img`);
        starChange.src="images/star.svg";
    }
}

// Test section to add books to library:
let book1 = new Book('Uno', 'Chiraag', 456, true, 1);
let book2 = new Book('Duo', 'Chiraag', 345, false, 2);
let book3 = new Book('Thres', 'Chiraag', 200, false, 3);
let book4 = new Book('four', 'Chiraag', 200, false, 4);
let book5 = new Book('five', 'Chiraag', 200, false, 5);
let book6 = new Book('Thres', 'Chiraag', 200, false, 0);
let book7 = new Book('Thres', 'Chiraag', 200, false, 0);
let book8 = new Book('Thres', 'Chiraag', 200, false, 0);
let book9 = new Book('Thres', 'Chiraag', 200, false, 0);
let book10 = new Book('Thres', 'Chiraag', 200, false, 0);
let book11= new Book('Thres', 'Chiraag', 200, false, 0);
let book12= new Book('Seven', 'Chiraag', 200, false, 7);

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