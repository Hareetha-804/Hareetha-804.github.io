const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');
const wishlistDiv = document.createElement("div");

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm.trim() !== '') {
        searchBooks(searchTerm);
    }
});

function searchBooks(query) {
    const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.docs);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(books) {
    resultsDiv.innerHTML = '';

    if (books.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    books.forEach(book => {
        const title = book.title;
        const authors = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
        const coverId = book.cover_i;
        const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
            <img src="${coverUrl}" alt="${title} cover">
            <h2>${title}</h2>
            <p>${authors}</p>
        `;

        resultsDiv.appendChild(bookCard);
    });
}
