import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Preloader from '../Preloader/Preloader';
import { DESCTOP_NEW_CARDS, DESKTOP_CARDS, MOBILE_CARDS, MOBILE_NEW_CARDS, TABLET_CARDS } from '../../utils/constants';
function Movies(props) {
	const [currentCards, setCurrentCards] = React.useState(0);
	const [maxCards, setMaxCards] = React.useState(4);
	function handleMoreClick() {
		setCurrentCards(currentCards + maxCards);
	}
	React.useEffect(() => {
		setCurrentCards(
			window.innerWidth >= 1180
				? DESKTOP_CARDS
				: window.innerWidth < 1180 && window.innerWidth > 780
				? TABLET_CARDS
				: window.innerWidth < 780
				? MOBILE_CARDS
				: null
		);
	}, []);
	React.useEffect(() => {
		function handleResize() {
			setCurrentCards(window.innerWidth >= 1180 ? 12 : window.innerWidth < 1180 && window.innerWidth > 780 ? 8 : window.innerWidth <= 780 ? 5 : null);
			setMaxCards(window.innerWidth >= 1180 ? DESCTOP_NEW_CARDS : MOBILE_NEW_CARDS);
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Switch>
			<Route path='/'>
				<SearchForm
					onSearch={props.onSearch}
					onSavedSearch={props.onSavedSearch}
					noResultsStatus={props.noResultsStatus}
					setCheckboxStatus={props.setCheckboxStatus}
				/>
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
