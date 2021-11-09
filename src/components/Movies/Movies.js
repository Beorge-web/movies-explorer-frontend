import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
	return (
		<>
			<SearchForm />
			<MoviesCardList />
			<Footer/>
		</>
	);
}
export default Movies;
