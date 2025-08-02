// Firebase configuration - REPLACE THESE VALUES WITH YOUR ACTUAL FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const db = firebase.firestore();

// Your original Netflix data
const originalMoviesData = [
    {
        id: 3,
        title: "Money Heist",
        description: "An unusual group of robbers attempt to carry out the most perfect robbery.",
        image: "https://i.imgur.com/SQo2qzT.jpg",
        year: 2017,
        rating: "TV-MA",
        genre: "Action Crime"
    },
    {
        id: 4,
        title: "Breaking Bad",
        description: "A high school chemistry teacher diagnosed with cancer turns to a life of crime.",
        image: "https://i.imgur.com/6H5R24A.jpg",
        year: 2008,
        rating: "TV-MA",
        genre: "Crime Drama"
    },
    {
        id: 5,
        title: "The Witcher",
        description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world.",
        image: "https://i.imgur.com/4H5R24A.jpg",
        year: 2019,
        rating: "TV-MA",
        genre: "Fantasy Drama"
    },
    {
        id: 6,
        title: "Black Mirror",
        description: "An anthology series exploring a twisted, high-tech world where humanity's dark.",
        image: "https://i.imgur.com/5H5R24A.jpg",
        year: 2011,
        rating: "TV-MA",
        genre: "Sci-Fi Anthology"
    },
    {
        id: 7,
        title: "Patallok",
        description: "A gripping tale of crime and politics in the underworld of Mumbai.",
        image: "https://i.imgur.com/7H5R24A.jpg",
        year: 2020,
        rating: "TV-MA",
        genre: "Crime Drama"
    },
    {
        id: 8,
        title: "Mirzapur",
        description: "A small town in Uttar Pradesh becomes the center of power struggles among local gangs and politicians.",
        image: "https://i.imgur.com/8H5R24A.jpg",
        year: 2018,
        rating: "TV-MA",
        genre: "Action Crime"
    },
    {
        id: 9,
        title: "Ravan",
        description: "An intense story of mythology and power set in ancient times.",
        image: "https://i.imgur.com/9H5R24A.jpg",
        year: 2021,
        rating: "TV-14",
        genre: "Mythological Drama"
    },
    {
        id: 10,
        title: "Dark",
        description: "A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery.",
        image: "https://i.imgur.com/a1b2c3d.jpg",
        year: 2017,
        rating: "TV-MA",
        genre: "Sci-Fi Thriller"
    },
    {
        id: 11,
        title: "The Umbrella Academy",
        description: "A dysfunctional family of superheroes comes together to prevent the apocalypse.",
        image: "https://i.imgur.com/d4e5f6g.jpg",
        year: 2019,
        rating: "TV-14",
        genre: "Superhero Fantasy"
    },
    {
        id: 12,
        title: "Locke & Key",
        description: "Three siblings discover magical keys that unlock supernatural abilities and secrets.",
        image: "https://i.imgur.com/g7h8i9j.jpg",
        year: 2020,
        rating: "TV-14",
        genre: "Supernatural Horror"
    },
    {
        id: 13,
        title: "Outer Banks",
        description: "A group of teens search for treasure while navigating dangerous adventures on their island home.",
        image: "https://i.imgur.com/k1l2m3n.jpg",
        year: 2020,
        rating: "TV-14",
        genre: "Adventure Drama"
    },
    {
        id: 14,
        title: "I Am Not Okay with This",
        description: "A teenage girl navigates the challenges of high school while discovering she has supernatural powers.",
        image: "https://i.imgur.com/o5p6q7r.jpg",
        year: 2020,
        rating: "TV-MA",
        genre: "Supernatural Comedy"
    },
    {
        id: 15,
        title: "The Outsider",
        description: "Investigators uncover supernatural forces at work in a seemingly straightforward case.",
        image: "https://i.imgur.com/p7q8r9s.jpg",
        year: 2020,
        rating: "TV-MA",
        genre: "Supernatural Drama"
    },
    {
        id: 16,
        title: "Wayward Pines",
        description: "A Secret Service agent finds himself trapped in a town that is not what it seems.",
        image: "https://i.imgur.com/q1w2e3r.jpg",
        year: 2015,
        rating: "TV-14",
        genre: "Sci-Fi Mystery"
    },
    {
        id: 17,
        title: "Fringe",
        description: "An FBI team investigates unusual and unexplained phenomena.",
        image: "https://i.imgur.com/r4t5y6u.jpg",
        year: 2008,
        rating: "TV-14",
        genre: "Sci-Fi Drama"
    },
    {
        id: 18,
        title: "Twin Peaks",
        description: "A murder mystery in a small town uncovers strange secrets and supernatural elements.",
        image: "https://i.imgur.com/y8u9w1v.jpg",
        year: 1990,
        rating: "TV-14",
        genre: "Mystery Drama"
    },
    {
        id: 19,
        title: "The X-Files",
        description: "FBI agents investigate unsolved cases involving paranormal phenomena.",
        image: "https://i.imgur.com/z2x5c9n.jpg",
        year: 1993,
        rating: "TV-14",
        genre: "Sci-Fi Mystery"
    }
];

// Function to fetch movies from Firebase
async function fetchMoviesFromDB() {
    try {
        const snapshot = await db.collection('movies').get();
        const movies = [];
        snapshot.forEach((doc) => {
            movies.push({ id: doc.id, ...doc.data() });
        });
        return movies;
    } catch (error) {
        console.error("Error fetching movies: ", error);
        return [];
    }
}

// Function to add a movie to Firebase
async function addMovieToDB(movie) {
    try {
        const docRef = await db.collection('movies').add(movie);
        console.log("Movie added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding movie: ", error);
    }
}

// Function to delete a movie from Firebase
async function deleteMovieFromDB(movieId) {
    try {
        await db.collection('movies').doc(movieId).delete();
        console.log("Movie deleted with ID: ", movieId);
        return true;
    } catch (error) {
        console.error("Error deleting movie: ", error);
        return false;
    }
}

// Expose deleteMovieFromDB to global scope
window.deleteMovieFromDB = deleteMovieFromDB;

// Function to initialize the database with original data
async function initializeDatabase() {
    try {
        // Check if we already have data in the database
        const snapshot = await db.collection('movies').get();
        if (snapshot.empty) {
            console.log("Database is empty. Initializing with original data...");
            // Add all original movies to the database
            for (const movie of originalMoviesData) {
                await addMovieToDB(movie);
            }
            console.log("Database initialized with original data.");
        } else {
            console.log("Database already contains data. Skipping initialization.");
        }
    } catch (error) {
        console.error("Error initializing database: ", error);
    }
}

// Function to update user data in Firebase
async function updateUserData(userId, data) {
    try {
        await db.collection('users').doc(userId).set(data, { merge: true });
        console.log("User data updated successfully");
    } catch (error) {
        console.error("Error updating user data: ", error);
    }
}

// Function to fetch user data from Firebase
async function fetchUserData(userId) {
    try {
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        } else {
            console.log("No such user!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}

// Initialize database when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeDatabase();
});
