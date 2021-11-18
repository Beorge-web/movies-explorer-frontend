import MovieCard from '../MovieCard/MovieCard';
import React from 'react';
function SavedMoviesCardList({ filteredSavedMovies, myMovies, onLike, searchStatus, onRemove }) {
	console.log(searchStatus);
	const renderMovies = searchStatus ? filteredSavedMovies : myMovies;
	console.log(Object.values(filteredSavedMovies).length);
	return (
		<div className='card-list root__section'>
			<div className='card-list__cards'>
				{renderMovies.slice(0).map((movie) => {
					return <MovieCard movie={movie} key={movie._id} onLike={onLike} onRemove={onRemove} />;
				})}
			</div>
		</div>
	);
}
export default SavedMoviesCardList;
