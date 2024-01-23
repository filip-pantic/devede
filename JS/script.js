import { db, collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "./firebase.js";

document.addEventListener('DOMContentLoaded', async () => {
    const addMovieButton = document.querySelector('#add-btn');
    const searchButton = document.querySelector('#search-btn');
    const moviesElem = document.querySelector('#movies');
    const favoritesButton = document.querySelector('#favorites-btn');

    addMovieButton.addEventListener('click', async () => {
        const titleInput = document.querySelector('#title-input');
        const genreInput = document.querySelector('#genre-input');
        const releaseDateInput = document.querySelector('#release-date-input');

        const movie = {
            title: titleInput.value,
            genre: genreInput.value,
            releaseDate: releaseDateInput.value,
            watched: false,
            favorites: false,
            createdAt: new Date().toISOString()
        };

        titleInput.value = '';
        genreInput.value = '';
        releaseDateInput.value = '';

        await addMovie(movie);
    });

    async function addMovie(movie) {
        const movieQuery = query(collection(db, 'movies'), where('title', '==', movie.title));
        const querySnapshot = await getDocs(movieQuery);
        if (!querySnapshot.empty) {
            alert('A movie with this title already exists!');
            return;
        }
        try {
            await addDoc(collection(db, 'movies'), movie);
            alert('Movie added!');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    searchButton.addEventListener('click', async () => {
        const searchValue = document.querySelector('#search-input').value.trim();
        await searchMovies(searchValue);
    });

    async function searchMovies(searchTerm) {
        moviesElem.innerHTML = '';
        const searchQuery = query(collection(db, 'movies'), where('title', '==', searchTerm));
        const querySnapshot = await getDocs(searchQuery);
        if (querySnapshot.empty) {
            moviesElem.innerHTML = '<p>No movies found matching your search.</p>';
        } else {
            querySnapshot.forEach((doc) => {
                createMovieElement({ id: doc.id, ...doc.data() });
            });
        }
    }

    favoritesButton.addEventListener('click', async () => {
        await displayFavorites();
    });

    async function displayFavorites() {
        moviesElem.innerHTML = '';
        const favoritesQuery = query(collection(db, 'movies'), where('favorites', '==', true));
        const querySnapshot = await getDocs(favoritesQuery);
        if (querySnapshot.empty) {
            moviesElem.innerHTML = '<p>No favorite movies yet.</p>';
        } else {
            querySnapshot.forEach((doc) => {
                createMovieElement({ id: doc.id, ...doc.data() });
            });
        }
    }

    function createMovieElement(movie) {
        const containerElem = document.createElement('div');
        containerElem.setAttribute('data-movie-id', movie.id);

        const titleElem = document.createElement('h2');
        titleElem.textContent = movie.title;

        const genreElem = document.createElement('p');
        genreElem.textContent = movie.genre;

        const releaseDateElem = document.createElement('p');
        releaseDateElem.textContent = `Release Date: ${movie.releaseDate}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteMovie(movie.id);

        const watchedButton = document.createElement('button');
        watchedButton.textContent = movie.watched ? 'Remove from Watched' : 'Mark as Watched';
        watchedButton.onclick = () => toggleWatched(movie);

        const favoritesButton = document.createElement('button');
        favoritesButton.textContent = movie.favorites ? 'Remove from Favorites' : 'Add to Favorites';
        favoritesButton.onclick = () => toggleFavorite(movie);

        containerElem.appendChild(titleElem);
        containerElem.appendChild(genreElem);
        containerElem.appendChild(releaseDateElem);
        containerElem.appendChild(deleteButton);
        containerElem.appendChild(watchedButton);
        containerElem.appendChild(favoritesButton);

        moviesElem.appendChild(containerElem);
    }   

    async function deleteMovie(movieId) {
        try {
            await deleteDoc(doc(db, 'movies', movieId));
            alert('Movie deleted!');
            const deletedMovieElem = document.querySelector(`[data-movie-id="${movieId}"]`);
            if (deletedMovieElem) {
                moviesElem.removeChild(deletedMovieElem);
            }
        } catch (error) {
            console.error("Error deleting movie: ", error);
        }
    }

    async function toggleWatched(movie) {
        try {
            const newWatchedValue = !movie.watched;
            const movieRef = doc(db, 'movies', movie.id);
            await updateDoc(movieRef, { watched: newWatchedValue });
            movie.watched = newWatchedValue;
            const watchedButton = document.querySelector(`[data-movie-id="${movie.id}"] button:nth-child(5)`);
            if (watchedButton) {
                watchedButton.textContent = newWatchedValue ? 'Remove from Watched' : 'Mark as Watched';
            }
        } catch (error) {
            console.error("Error updating watched status: ", error);
        }
    }

    async function toggleFavorite(movie) {
        try {
            const newFavoriteValue = !movie.favorites;
            const movieRef = doc(db, 'movies', movie.id);
            await updateDoc(movieRef, { favorites: newFavoriteValue });
            movie.favorites = newFavoriteValue;
            const favoritesButton = document.querySelector(`[data-movie-id="${movie.id}"] button:nth-child(6)`);
            if (favoritesButton) {
                favoritesButton.textContent = newFavoriteValue ? 'Remove from Favorites' : 'Add to Favorites';
            }
        } catch (error) {
            console.error("Error updating favorite status: ", error);
        }
    }
});
