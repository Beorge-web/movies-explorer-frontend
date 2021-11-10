import MovieCard from '../MovieCard/MovieCard';
import { Switch, Route } from 'react-router-dom';

function MoviesCardList() {
	return (
		<Switch>
			<div className='card-list root__section'>
				<div className='card-list__cards'>
					<Route path='/movies'>
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
						<MovieCard />
					</Route>
					<Route path='/saved-movies'>
						<MovieCard />
						<MovieCard />
						<MovieCard />
					</Route>
				</div>
				<button type='button' className='card-list__more'>
					Еще
				</button>
			</div>
		</Switch>
	);
}
export default MoviesCardList;
