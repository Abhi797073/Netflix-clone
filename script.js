const questions = document.querySelectorAll('.faq-question');
questions.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active class for the button
        btn.classList.toggle('active');

        // Toggle the answer display
        const answer = btn.nextElementSibling;
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    });
});

// Function to display data in the container
function displayData(movies) {
    const container = document.getElementById('dataContainer');
    container.innerHTML = '';

    if (movies.length === 0) {
        container.innerHTML = '<p>No data available</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'data-item';
        movieElement.innerHTML = `
            <h4>${movie.title}</h4>
            <p>${movie.description}</p>
            <div class="meta">
                <span class="year">${movie.year}</span>
                <span class="rating">${movie.rating}</span>
            </div>
            <div class="genre">${movie.genre}</div>
            <button class="delete-btn" data-id="${movie.id}">Delete</button>
        `;
        container.appendChild(movieElement);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const movieId = e.target.getAttribute('data-id');
            const success = await deleteMovieFromDB(movieId);
            if (success) {
                // Remove the movie element from the UI
                e.target.parentElement.remove();
                console.log("Movie deleted successfully");
            } else {
                console.error("Failed to delete movie");
            }
        });
    });
}

// Load data automatically when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // The database initialization and data fetching is now handled in firebase.js
    // When firebase.js initializes the database, it will automatically fetch data
    // We add a small delay to ensure Firebase is initialized before fetching data
    setTimeout(() => {
        fetchMoviesFromDB().then(movies => {
            if (movies.length > 0) {
                displayData(movies);
            }
        }).catch(error => {
            console.error("Error fetching movies:", error);
        });
    }, 1000);
});

// Refresh data when the button is clicked
document.getElementById('loadDataBtn').addEventListener('click', () => {
    fetchMoviesFromDB().then(movies => {
        displayData(movies);
    }).catch(error => {
        console.error("Error fetching movies:", error);
    });
});
