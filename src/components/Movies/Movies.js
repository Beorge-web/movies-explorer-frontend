import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Preloader from '../Preloader/Preloader';
function Movies(props) {
	const [currentCards, setCurrentCards] = React.useState(0);
	const [maxCards, setMaxCards] = React.useState(4);
	function handleMoreClick() {
		setCurrentCards(currentCards + maxCards);
	}
	React.useEffect(() => {
		setCurrentCards(window.innerWidth >= 1180 ? 12 : window.innerWidth < 1180 && window.innerWidth > 780 ? 8 : window.innerWidth < 780 ? 5 : null);
	}, []);
	React.useEffect(() => {
		function handleResize() {
			setCurrentCards(window.innerWidth >= 1180 ? 12 : window.innerWidth < 1180 && window.innerWidth > 780 ? 8 : window.innerWidth <= 780 ? 5 : 8);
			setMaxCards(window.innerWidth >= 1180 ? 4 : 2);
		}
		window.addEventListener('resize', handleResize);
	}, []);

	return (
		<Switch>
			<Route path='/'>
				<SearchForm onSearch={props.onSearch} onSavedSearch={props.onSavedSearch} noResultsStatus={props.noResultsStatus} />
				{props.isLoading ? <Preloader /> : null}
				<Route path='/movies' exact>
					<MoviesCardList filteredMovies={props.filteredMovies} onLike={props.onLike} currentCards={currentCards} onClick={handleMoreClick} />
				</Route>
				<Route path='/saved-movies' exact>
					<SavedMoviesCardList
						myMovies={props.myMovies}
						onLike={props.onLike}
						currentCards={currentCards}
						onClick={handleMoreClick}
						onRemove={props.onRemove}
						filteredSavedMovies={props.filteredSavedMovies}
						onSavedMoviesLoad={props.onSavedMoviesLoad}
						searchStatus={props.searchStatus}
					/>
				</Route>
				<Footer />
			</Route>
		</Switch>
	);
}
export default Movies;
