const container = document.querySelector(".cards");
const myForm = document.querySelector("#myForm");
const dialog = document.querySelector("dialog");
const closeDialogButton = document.querySelector("dialog button");

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  getInfo() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  }
  changeReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  getBooks() {
    return this.books;
  }
  addBook(title, author, pages, read = false) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
  }
  deleteBook(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1)
    }
  }
  changeReadStatus(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books[index].changeReadStatus();
    }
  }
}

const myLibrary = new Library();
myLibrary.addBook("Parable of the Sower", "Octavia E. Butler", 279, true);
myLibrary.addBook("Dune", "Frank Herbert", 350, false);
myLibrary.addBook("Flowers for Algernon", "Daniel Keyes", 250, true);
myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 295, false);

displayLibrary(myLibrary.getBooks())


// TODO: Create a class controller to manage the UI

function displayLibrary(myLibrary) {
  container.innerHTML = "";

  myLibrary.forEach((book, index) => {
    // Create the main card container
    const card = document.createElement("div");
    card.classList.add("card");

    // Create and populate Title, Author, Pages and Read Status
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("card-title");
    titleDiv.textContent = `Title: ${book.title}`;

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("card-author");
    authorDiv.textContent = `Author: ${book.author}`;

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("card-pages");
    pagesDiv.textContent = `Pages: ${book.pages}`;

    const readDiv = document.createElement("div");
    readDiv.classList.add("card-read");
    readDiv.textContent = `Read: ${book.read ? "Yes" : "No"}`;

    // Create Change Status Button & attach listener immediately
    const changeBtn = document.createElement("button");
    changeBtn.classList.add("btn-change");
    changeBtn.dataset.id = book.id;
    changeBtn.textContent = "Change read status";

    // Create Delete Button & attach listener immediately
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.dataset.id = book.id;
    deleteBtn.textContent = "Delete book";

    // Append everything to the card, then the card to the container
    card.append(titleDiv, authorDiv, pagesDiv, readDiv, changeBtn, deleteBtn);
    container.appendChild(card);
  });

  // Re-create the static "New Book" card at the very end
  const newBookCard = document.createElement("div");
  newBookCard.classList.add("card", "new");

  const newBookBtn = document.createElement("button");
  newBookBtn.textContent = "New Book";
  // Attach your function to open the form/modal here
  newBookBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  newBookCard.appendChild(newBookBtn);
  container.appendChild(newBookCard);
}

function deleteBook(id) {
  myLibrary.deleteBook(id)
  displayLibrary(myLibrary.getBooks());
}

function changeReadStatus(id) {
  myLibrary.changeReadStatus(id)
  displayLibrary(myLibrary.getBooks());
}

// Add event listener to every click on a change/delete button
container.addEventListener("click", (event) => {
  // Check if what we clicked has the 'btn-delete' class
  if (event.target.classList.contains("btn-delete")) {
    const bookId = event.target.dataset.id;
    deleteBook(bookId);
  }

  // Check if what we clicked has the 'btn-change' class
  if (event.target.classList.contains("btn-change")) {
    const bookId = event.target.dataset.id;
    changeReadStatus(bookId);
  }
});

// Form control and dialog

// "Close" button closes the dialog
closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

myForm.addEventListener("submit", (event) => {
  event.preventDefault(); // This stops the page from reloading

  // Grab the values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  if (title === "" || author === "" || pages <= 0) {
    // TODO: Add validation alerts
    event.preventDefault();
  } else {
    myLibrary.addBook(title, author, +pages, read);
    displayLibrary(myLibrary.getBooks());
    event.preventDefault();
  }

  myForm.reset();
  dialog.close();
});
