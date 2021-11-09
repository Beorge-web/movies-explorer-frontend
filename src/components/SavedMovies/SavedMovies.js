import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
	return (
		<>
			<SearchForm />
			<MoviesCardList />
			<Footer/>
		</>
	);
}
export default SavedMovies;