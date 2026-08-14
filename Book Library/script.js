
const books = JSON.parse(localStorage.getItem('book')) || [];

const form = document.getElementById('frm1');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const genreInput = document.getElementById('genre');
const display = document.querySelector('.display');
const addbookBtn = document.getElementById('addbookBtn');
addbookBtn.addEventListener('click', addBook);

let bookId = null;

function addBook() {
    const authorMessage = document.getElementById('authorMessage');
    const titleMessage = document.getElementById('titleMessage');
    const yearMessage = document.getElementById(' yearMessage');
    const genreMessage = document.getElementById('genreMessage');
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const year = yearInput.value.trim();
    const genre = genreInput.value.trim();

    if (title === "") {
        titleMessage.textContent = "please enter a title";
        return;
    }
    if (author === "") {
        authorMessage.textContent = "please enter a author";
        return;
    }
    if (year === "") {
        yearMessage.textContent = "please eneter a year";
        return;
    }
    if (genre === "") {
        genreMessage.textContent = "please eneter a genre";
        return;
    }

    const book = {
        id: Date.now(),
        title: title,
        author: author,
        year: year,
        genre: genre
    }
    if (bookId === null) {
        books.push(book);
    } else if (bookId !== null) {
        const clickedBook = books.find(kitabu => kitabu.id === bookId);
        console.log(clickedBook);

        if (clickedBook) {
            clickedBook.title = title;
            clickedBook.author = author;
            clickedBook.year = year;
            clickedBook.genre = genre;
        }

        bookId = null;
        addbookBtn.textContent = "Add Book";
    }

    localStorage.setItem('book', JSON.stringify(books));
    console.log(books.length);
    displayBooks();

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    genreInput.value = "";
}

function displayBooks() {
    display.innerHTML = "";

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Year: ${book.year}</p>
        <p>Genre: ${book.genre}</p>
        `
        const deletBtn = document.createElement('button');
        deletBtn.textContent = "DELETE";
        deletBtn.id = 'delet';
        deletBtn.addEventListener('click', () => {
            const bookId = book.id;
            const bookIndex = books.findIndex(kitabu => kitabu.id === bookId);

            console.log(bookId);
            console.log(bookIndex);

            if (bookIndex !== -1) {
                books.splice(bookIndex, 1)
                localStorage.setItem('book', JSON.stringify(books));
            }
            displayBooks();
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = "EDIT";
        editBtn.id = 'editBtn';
        editBtn.setAttribute('popovertarget', 'section');
        editBtn.addEventListener('click', () => {
            const clickedBook = books.find(kitabu => kitabu.id === book.id);
            console.log(clickedBook);
            console.log(book.id);

            if (!clickedBook) return;

            titleInput.value = clickedBook.title;
            authorInput.value = clickedBook.author;
            yearInput.value = clickedBook.year;
            genreInput.value = clickedBook.genre;

            bookId = clickedBook.id;
            addbookBtn.textContent = "Update Book";

        });

        const btnDiv = document.createElement('div');
        btnDiv.id = 'btnDiv';
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deletBtn);

        bookDiv.appendChild(btnDiv);
        display.appendChild(bookDiv);
    });

    console.log(books[1].id);
}
displayBooks();

