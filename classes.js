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

class ScreenController {
  constructor() {
    this.myLibrary = new Library();
    this.container = document.querySelector(".cards");
    this.myForm = document.querySelector("#myForm");
    this.dialog = document.querySelector("dialog");
    this.closeDialogButton = document.querySelector("dialog button");

    this.myLibrary.addBook("Parable of the Sower", "Octavia E. Butler", 279, true);
    this.myLibrary.addBook("Dune", "Frank Herbert", 350, false);
    this.myLibrary.addBook("Flowers for Algernon", "Daniel Keyes", 250, true);
    this.myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 295, false);

    // Add event listener to every click on a change/delete button
    this.container.addEventListener("click", (event) => {
      // Check if what we clicked has the 'btn-delete' class
      if (event.target.classList.contains("btn-delete")) {
        const bookId = event.target.dataset.id;
        this.handleDeleteBook(bookId);
      }

      // Check if what we clicked has the 'btn-change' class
      if (event.target.classList.contains("btn-change")) {
        const bookId = event.target.dataset.id;
        this.handleChangeReadStatus(bookId);
      }
    });

    // Form control and dialog

    // "Close" button closes the dialog
    this.closeDialogButton.addEventListener("click", () => {
      this.dialog.close();
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
        this.myLibrary.addBook(title, author, +pages, read);
        this.displayLibrary(this.myLibrary.getBooks());
        event.preventDefault();
      }

      this.myForm.reset();
      this.dialog.close();
    });
  }

  displayLibrary() {
    this.container.innerHTML = "";
    this.myLibrary.getBooks().forEach((book) => {
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
      this.container.appendChild(card);
    });

    // Re-create the static "New Book" card at the very end
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("card", "new");

    const newBookBtn = document.createElement("button");
    newBookBtn.textContent = "New Book";

    // Attach your function to open the form/modal here
    newBookBtn.addEventListener("click", () => {
      this.dialog.showModal();
    });

    newBookCard.appendChild(newBookBtn);
    this.container.appendChild(newBookCard);
  }

  handleDeleteBook(id) {
    this.myLibrary.deleteBook(id);
    this.displayLibrary(this.myLibrary.getBooks());
  }

  handleChangeReadStatus(id) {
    this.myLibrary.changeReadStatus(id);
    this.displayLibrary(this.myLibrary.getBooks());
  }
}

new ScreenController().displayLibrary()