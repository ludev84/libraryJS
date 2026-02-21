const myLibrary = [];

function Book(title, author, pages, read) {
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
  }
}

function addBookToLibrary(title, author, pages, read=false) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("Parable of the Sower", "Octavia E. Butler", 279, true);
addBookToLibrary("Dune", "Frank Herbert", 350, false);
addBookToLibrary("Flowers for Algernon", "Daniel Keyes", 250, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

displayLibrary(myLibrary);

function displayLibrary(myLibrary) {
  const container = document.querySelector(".cards");
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
    changeBtn.dataset.index = index;
    changeBtn.textContent = "Change read status";
    changeBtn.addEventListener('click', () => {
      changeReadStatus(index);
    });

    // Create Delete Button & attach listener immediately
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.dataset.index = index;
    deleteBtn.textContent = "Delete book";
    deleteBtn.addEventListener('click', () => {
      deleteBook(index);
    });

    // Append everything to the card, then the card to the container
    card.append(titleDiv, authorDiv, pagesDiv, readDiv, changeBtn, deleteBtn);
    container.appendChild(card);
  });

  // Re-create the static "New Book" card at the very end
  const newBookCard = document.createElement("div");
  newBookCard.classList.add("card", "new");
  
  const newBookBtn = document.createElement("button");
  newBookBtn.textContent = "New Book";
  // Optional: Attach your function to open the form/modal here
  // newBookBtn.addEventListener("click", openNewBookModal);
  newBookBtn.addEventListener("click", () => {
    dialog.showModal();
  });
  
  newBookCard.appendChild(newBookBtn);
  container.appendChild(newBookCard);
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary(myLibrary);
}

function changeReadStatus(index) {
  myLibrary[index].changeReadStatus();
  displayLibrary(myLibrary);
}

// Form control
const dialog = document.querySelector("dialog");
// const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener('click', (event) => {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages")
  const read = document.querySelector("#read");

  if (title.value === '' || author.value === '' || pages.value <= 0) {
    // TODO: Add validation alerts
    event.preventDefault();
  } else {
    addBookToLibrary(title.value, author.value, +pages.value, Boolean(+read.value));
    displayLibrary(myLibrary);
    document.getElementById("myForm").reset();
    dialog.close();
    event.preventDefault();
  }
})