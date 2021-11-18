import MovieCard from '../MovieCard/MovieCard';
import React from 'react';
function MoviesCardList({ filteredMovies, currentCards, onLike, onClick }) {
	return (
		<div className='card-list root__section'>
			<div className='card-list__cards'>
				{Object.keys(filteredMovies).length >= 1
					? filteredMovies.slice(0, currentCards).map((movie) => {
							return <MovieCard movie={movie} key={movie.id} onLike={onLike} />;
					  })
					: ''}
			</div>
			{Object.keys(filteredMovies).length > currentCards ? (
				<button type='button' className='card-list__more' onClick={onClick}>
					Еще
				</button>
			) : null}
		</div>
	);
}
export default MoviesCardList;
