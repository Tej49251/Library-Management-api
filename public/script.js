document.addEventListener('DOMContentLoaded', function () {
    const bookList = document.getElementById('bookList');
    const addBookForm = document.getElementById('addBookForm');

    // Function to load books from the server
    const loadBooks = async () => {
        const response = await fetch('/books');
        const books = await response.json();
        bookList.innerHTML = '';

        books.forEach(book => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerText = `${book.title} by ${book.author} (Published: ${book.published_date}, Available: ${book.available})`;
            bookList.appendChild(li);
        });
    };

    // Function to handle the form submission
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const published_date = document.getElementById('publishedDate').value;
        const available = document.getElementById('bookAvailable').value;

        await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author,
                published_date,
                available,
            }),
        });

        addBookForm.reset();
        loadBooks();
    });

    // Load books on page load
    loadBooks();
});
