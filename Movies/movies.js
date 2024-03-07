var sideOption = document.getElementById("side");

function showMenu() {
    sideOption.style.left = "0";
}

function hideMenu() {
    sideOption.style.left = "-300px";
}

function aaa() {
    window.location.href = "/IMDBPro/pro.html";
}

const API_KEY = 'api_key=49e3be45df1c1a483b5eb9560e3c73ab';
const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const getMovies = async(url) => {
    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

const renderMovies = (category, movies, limit) => {
    const container = document.getElementById(`${category}-movies`);
    container.innerHTML = '';

    movies.slice(0, limit).forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
          
            <a href="./MoviePage/moviePage.html?id=${movie.id}"><img src=${IMAGE_URL + movie.poster_path} alt="{movie.id}"></a>
            <div class="movie-info">
              <h3>${movie.title}</h3>
              <div class="star">
                <span class="icon-color"><i class="fa-solid fa-star">&nbsp;</i>${movie.vote_average}</span>
              </div>
              <p>Votes: ${movie.vote_count}</p>
            <p>Popularity: ${movie.popularity}</p>
            <p>${movie.release_date}</p>
            </div>            
            
        `;
        container.appendChild(movieElement);
    });
};

document.addEventListener('DOMContentLoaded', async() => {

    // Movies with Most Votes
    const mostVotesUrl = `${API_URL}?${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
    const mostVotesMovies = (await getMovies(mostVotesUrl));
    renderMovies('most-votes', mostVotesMovies, 5);

    // Popular Movies
    const popularUrl = `${API_URL}?${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
    const popularMovies = await getMovies(popularUrl);
    renderMovies('popular', popularMovies, 5);

    // Top Rated Movies
    const topRatedUrl = `${API_URL}?${API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
    const topRatedMovies = (await getMovies(topRatedUrl)).filter(movie => movie.vote_average > 0);
    renderMovies('top-rated', topRatedMovies, 5);


});