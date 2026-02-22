const myLibrary = [];
const container = document.querySelector(".cards");
const myForm = document.querySelector("#myForm");
const dialog = document.querySelector("dialog");
const closeDialogButton = document.querySelector("dialog button");

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
  this.changeReadStatus = function () {
    this.read = !this.read;
  };
}

function addBookToLibrary(title, author, pages, read = false) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("Parable of the Sower", "Octavia E. Butler", 279, true);
addBookToLibrary("Dune", "Frank Herbert", 350, false);
addBookToLibrary("Flowers for Algernon", "Daniel Keyes", 250, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

displayLibrary(myLibrary);

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
  myLibrary.splice(myLibrary.findIndex(book => book.id === id), 1);
  displayLibrary(myLibrary);
}

function changeReadStatus(id) {
  myLibrary[myLibrary.findIndex(book => book.id === id)].changeReadStatus();
  displayLibrary(myLibrary);
}

// Add event listener to every click on a change/delete button
container.addEventListener('click', (event) => {
  // Check if what we clicked has the 'btn-delete' class
  if (event.target.classList.contains('btn-delete')) {
    const bookId = event.target.dataset.id;
    deleteBook(bookId);
  }

  // Check if what we clicked has the 'btn-change' class
  if (event.target.classList.contains('btn-change')) {
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

  if (title === '' || author === '' || pages <= 0) {
    // TODO: Add validation alerts
    event.preventDefault();
  } else {
    addBookToLibrary(title, author, +pages, read);
    displayLibrary(myLibrary);
    event.preventDefault();
  }

  myForm.reset();
  dialog.close();
});
