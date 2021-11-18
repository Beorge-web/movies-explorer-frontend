import Header from '../Header/Header';
import Main from '../Main/Main';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies';

import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import MainApi from '../../utils/MainApi';
import React from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesApi from '../../utils/MoviesApi';

function App() {
	const path = useLocation();
	let history = useHistory();
	const [isLoading, setIsLoading] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({});
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [myMovies, setMyMovies] = React.useState({});
	const [filteredMovies, setFilteredMovies] = React.useState({});
	const [authError, setAuthError] = React.useState('');
	const [filteredSavedMovies, setFilteredSavedMovies] = React.useState({});
	const [profileUpdateStatus, setProfileUpdateStatus] = React.useState(false);
	const [noResults, setNoResults] = React.useState(false);
	const [searchStatus, setSerchStatus] = React.useState(false);
	React.useEffect(() => {
		if (['/', '/movies', '/saved-movies', '/profile'].includes(path.pathname)) {
			tokenCheck();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	React.useEffect(() => {
		getMyMovies();
		setFilteredSavedMovies({});
		setAuthError('');
		setSerchStatus(false);
		setNoResults(false);
	}, [path.pathname]);
	function searchMovies(input, slider) {
		setIsLoading(true);
		const movies = JSON.parse(localStorage.getItem('movies'));
		let values = Object.values(movies);
		const longMovies = values.filter((item) => {
			if (item.duration >= 40) {
				return item;
			} else return 0;
		});
		let movieList = slider ? values : longMovies;
		const filtered = movieList.filter((item) => {
			if (JSON.stringify(item).toLowerCase().indexOf(input.toLowerCase()) >= 0) {
				return item;
			} else return 0;
		});
		setFilteredMovies(filtered);
		setNoResults(filtered.length === 0 ? true : false);
		setIsLoading(false);
	}
	function searchSavedMovies(input, slider) {
		setIsLoading(true);
		setSerchStatus(true);
		const longMovies = myMovies.filter((item) => {
			if (item.duration >= 40) {
				return item;
			} else return 0;
		});
		const savedMovieList = slider ? myMovies : longMovies;
		const filtered = savedMovieList.filter((item) => {
			if (JSON.stringify(item).toLowerCase().indexOf(input.toLowerCase()) >= 0) {
				return item;
			} else return 0;
		});
		setFilteredSavedMovies(filtered);
		setNoResults(filtered.length === 0 ? true : false);
		setIsLoading(false);
	}
	function tokenCheck() {
		MainApi.getToken().then((res) => {
			if (res.name) {
				setLoggedIn(true);
				setCurrentUser(res);
				history.push('/movies');
			}
		});
	}
	function getMovies() {
		setIsLoading(true);
		MoviesApi.getMovies()
			.then((res) => {
				localStorage.setItem('movies', JSON.stringify(res));
			})
			.then(() => setIsLoading(false));
	}
	function getMyMovies() {
		setIsLoading(true);
		MainApi.getMyMovies()
			.then((res) => {
				setMyMovies(res);
			})
			.then(() => setIsLoading(false));
	}
	function handleLoginUpdate(data) {
		MainApi.signIn(data).then((res) => {
			if (!res.message) {
				tokenCheck();
				history.push('/movies');
			} else {
				setAuthError(res.message);
			}
		});
	}
	function handleRegisterUpdate(data) {
		MainApi.signUp(data).then((res) => {
			if (!res.message) {
				history.push('/signin');
			} else {
				setAuthError(res.message);
			}
		});
	}
	function handleProfileUpdate(data) {
		MainApi.patchProfile(data).then((res) => {
			setCurrentUser(res);
			setProfileUpdateStatus(true);
		});
	}
	function handleLogout() {
		MainApi.logOut().then((res) => console.log(res));
		setLoggedIn(false);
	}
	function handleSearchClick(item, slider) {
		setIsLoading(true);
		if (!localStorage.getItem('movies')) {
			getMovies();
		}
		setTimeout(searchMovies, 1500, item, slider);
	}
	function handleSavedSearchClick(item, slider) {
		searchSavedMovies(item, slider);
	}
	function handleLikeClick(like, movie) {
		if (!like) {
			MainApi.addMovie(movie).then((newCard) => {
				setFilteredMovies((state) =>
					state.map((c) => {
						if (c.id === movie.id) {
							c.id = newCard._id;
							c.liked = true;
							return c;
						} else return c;
					})
				);
			});
		} else {
			MainApi.deleteMovie(movie.id).then((res) => {
				setFilteredMovies((state) =>
					state.map((c) => {
						if (c.id === movie.id) {
							c.liked = false;
							return c;
						} else return c;
					})
				);
			});
		}
	}
	function handleRemoveClick(movie) {
		MainApi.deleteMovie(movie._id).then((currentMovie) => {
			setMyMovies((state) => state.filter((c) => (c._id === currentMovie._id ? null : c)));
			if (Object.keys(filteredSavedMovies).length > 1) {
				setFilteredSavedMovies((state) => state.filter((c) => (c._id === currentMovie._id ? null : c)));
			}
		});
	}

	return (
		<div className='root'>
			<Header />
			<CurrentUserContext.Provider value={currentUser}>
				<Switch>
					<Route path='/' exact>
						<Main />
					</Route>
					<Route path='/signup' exact>
						<Register onUpdate={handleRegisterUpdate} authError={authError} />
					</Route>
					<Route path='/signin' exact>
						<Login onUpdate={handleLoginUpdate} authError={authError} />
					</Route>
					<ProtectedRoute
						component={Profile}
						path='/profile'
						profileUpdateStatus={profileUpdateStatus}
						loggedIn={loggedIn}
						onUpdate={handleProfileUpdate}
						onLogout={handleLogout}
					/>
					<ProtectedRoute
						component={Movies}
						path={['/movies', '/saved-movies']}
						loggedIn={loggedIn}
						feed='feed'
						onSearch={handleSearchClick}
						onSavedSearch={handleSavedSearchClick}
						filteredMovies={filteredMovies}
						onLike={handleLikeClick}
						myMovies={myMovies}
						onRemove={handleRemoveClick}
						isLoading={isLoading}
						filteredSavedMovies={filteredSavedMovies}
						onSavedMoviesLoad={getMyMovies}
						noResultsStatus={noResults}
						searchStatus={searchStatus}
					/>

					<Route path='*' exact>
						<NotFound />
					</Route>
				</Switch>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
