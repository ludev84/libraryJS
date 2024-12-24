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
}

function addBookToLibrary(title, author, pages, read=false) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Dune", "Frank Herbert", 350, false);
addBookToLibrary("Flowers for Algernon", "Daniel Keyes", 250, true);
addBookToLibrary("The Philosopher's Stone", "Colin Wilson", 325);

function displayLibrary(myLibrary) {
  const container = document.querySelector(".books");
  myLibrary.map(
    book => {
      const tr = document.createElement("tr")

      const thTitle = document.createElement("th");
      thTitle.textContent = book.title;

      const thAuthor = document.createElement("th");
      thAuthor.textContent = book.author;

      const thPages = document.createElement("th");
      thPages.textContent = book.pages;

      const thRead = document.createElement("th");
      thRead.textContent = book.read ? "Yes" : "No";

      tr.append(thTitle, thAuthor, thPages, thRead);
      container.appendChild(tr)
    }
  )
}

// Form control
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

displayLibrary(myLibrary);