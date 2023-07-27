import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import MovieListHeading from "./components/MovieListHeading";
import MovieData from "./db/movie.json";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourite from "./components/RemoveFavourite";

function App() {
  const [movies, setMovies] = useState(MovieData);
  const [favourites, setFavourites] = useState([]);

  const onSearch = (searchValue) => {
    if (searchValue === "") {
      setMovies(MovieData)
      return;
    }
    const filterBySearch = MovieData.filter((movie) => {
      return movie.movie.toLowerCase().includes(searchValue.toLowerCase())
    });
    setMovies(filterBySearch);
    console.log(filterBySearch,'filterBy search')
    console.log(searchValue,'hello its me')
  };

  console.log(MovieData)

  //To get the favourite movie from local storage when rerender
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("movieflix-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  // To save the favourite movie in local storage otherwise favorites gets vanished when refereshed
  const saveToLocalStorage = (items) => {
    localStorage.setItem("movieflix-favourites", JSON.stringify(items));
  };

  //add favourite movie function
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  //remove favourite movie function
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.id !== movie.id
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movieflix" />
        <SearchBar
          onSearch={onSearch}
        />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          favouriteComponent={AddFavourite}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourite}
        />
      </div>
    </div>
  );
}

export default App;
