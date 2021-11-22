/* eslint-disable react-hooks/exhaustive-deps */
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
import { SHORTFILM_DURATION } from '../../utils/constants';

function App() {
	const path = useLocation();
	let history = useHistory();
	const [isLoading, setIsLoading] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({});
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [myMovies, setMyMovies] = React.useState([]);
	const [filteredMovies, setFilteredMovies] = React.useState({});
	const [authError, setAuthError] = React.useState('');
	const [filteredSavedMovies, setFilteredSavedMovies] = React.useState({});
	const [profileUpdateStatus, setProfileUpdateStatus] = React.useState(false);
	const [noResults, setNoResults] = React.useState(false);
	const [searchStatus, setSerchStatus] = React.useState(false);
	const [checkbox, setCheckbox] = React.useState(false);
	const [lastInput, setLastInput] = React.useState('');
	const [movies, setMovies] = React.useState('');
	React.useEffect(() => {
		tokenCheck();
		if (localStorage.getItem('movies')) {
			setMovies(JSON.parse(localStorage.getItem('movies')));
		}
		getMyMovies();
	}, []);
	React.useEffect(() => {
		setFilteredSavedMovies({});
		setAuthError('');
		setSerchStatus(false);
		setNoResults(false);
		setLastInput('');
		setFilteredMovies({});
		setCheckbox(false);
	}, [path.pathname]);

	React.useEffect(() => {
		if (path.pathname === '/movies') {
			searchMovies(lastInput, checkbox);
		} else searchSavedMovies(lastInput, checkbox);
	}, [checkbox]);
	function searchMovies(input, slider) {
		if (!input) return;
		setIsLoading(true);
		setLastInput(input);
		const movies = JSON.parse(localStorage.getItem('movies'));
		let values = Object.values(movies);
		const shortMovies = values.filter((item) => {
			if (item.duration <= SHORTFILM_DURATION) {
				return item;
			} else return 0;
		});
		let movieList = slider ? shortMovies : values;
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
		if (Object.keys(myMovies).length === 0) return;
		setIsLoading(true);
		setLastInput(input);
		setSerchStatus(true);
		const shortMovies = myMovies.filter((item) => {
			if (item.duration <= SHORTFILM_DURATION) {
				return item;
			} else return 0;
		});
		const savedMovieList = slider ? shortMovies : myMovies;
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
		MainApi.getToken()
			.then((res) => {
				if (res.name) {
					console.log(res);
					setLoggedIn(true);
					setCurrentUser({ name: res.name, email: res.email });
					if (['/signin', '/signup'].includes(path.pathname)) {
						history.push('/movies');
					} else history.push(path.pathname);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function getMovies() {
		setIsLoading(true);
		MoviesApi.getMovies()
			.then((res) => {
				localStorage.setItem('movies', JSON.stringify(res));
				setMovies(res);
			})
			.then(() => setIsLoading(false))
			.catch((err) => {
				console.log(err);
			});
	}
	function getMyMovies() {
		setIsLoading(true);
		MainApi.getMyMovies()
			.then((res) => {
				setMyMovies(res);
			})
			.then(() => setIsLoading(false))
			.catch((err) => {
				console.log(err);
			});
	}
	function handleLoginUpdate(data) {
		setIsLoading(true);
		MainApi.signIn(data)
			.then((res) => {
				if (!res.message) {
					tokenCheck();
					getMyMovies();
					history.push('/movies');
				} else {
					setAuthError(res.message);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setIsLoading(false));
	}
	function handleRegisterUpdate(data) {
		setIsLoading(true);
		MainApi.signUp(data)
			.then((res) => {
				if (!res.message) {
					setCurrentUser({ name: res.data.name, email: res.data.email });
					setLoggedIn(true);
					getMyMovies();
					history.push('/movies');
				} else {
					setAuthError(res.message);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setIsLoading(false));
	}
	function handleProfileUpdate(data) {
		setIsLoading(true);
		MainApi.patchProfile(data)
			.then((res) => {
				setCurrentUser({ name: res.name, email: res.email });
				setProfileUpdateStatus(true);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setIsLoading(false));
	}
	function handleLogout() {
		MainApi.logOut()
			.then((res) => {
				console.log(res);
				localStorage.removeItem('movies');
			})
			.catch((err) => {
				console.log(err);
			});
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
			MainApi.addMovie(movie)
				.then((newCard) => {
					movies.map((c) => {
						if (c.id === movie.id) {
							c.id = newCard._id;
							c.liked = true;
							return c;
						} else return c;
					});
					localStorage.setItem('movies', JSON.stringify(movies));
					setFilteredMovies((state) =>
						state.map((c) => {
							if (c.id === movie.id) {
								c.id = newCard._id;
								c.liked = true;
								return c;
							} else return c;
						})
					);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			MainApi.deleteMovie(movie.id)
				.then((res) => {
					setFilteredMovies((state) =>
						state.map((c) => {
							if (c.id === movie.id) {
								console.log(c);
								c.liked = false;
								return c;
							} else return c;
						})
					);
					movies.map((c) => {
						if (c.id === movie.id) {
							c.liked = false;
							return c;
						} else return c;
					});
					localStorage.setItem('movies', JSON.stringify(movies));
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}
	function handleRemoveClick(movie) {
		MainApi.deleteMovie(movie._id)
			.then((currentMovie) => {
				setMyMovies((state) => state.filter((c) => (c._id === currentMovie._id ? null : c)));
				if (Object.keys(filteredSavedMovies).length >= 1) {
					setFilteredSavedMovies((state) => state.filter((c) => (c._id === currentMovie._id ? null : c)));
				}
				movies.map((c) => {
					if (c.id === movie._id) {
						c.liked = false;
						return c;
					} else return c;
				});
				localStorage.setItem('movies', JSON.stringify(movies));
			})
			.catch((err) => {
				console.log(err);
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
						<Register onUpdate={handleRegisterUpdate} authError={authError} isLoading={isLoading} />
					</Route>
					<Route path='/signin' exact>
						<Login onUpdate={handleLoginUpdate} authError={authError} isLoading={isLoading} />
					</Route>
					<ProtectedRoute
						component={Profile}
						path='/profile'
						profileUpdateStatus={profileUpdateStatus}
						loggedIn={loggedIn}
						onUpdate={handleProfileUpdate}
						onLogout={handleLogout}
						isLoading={isLoading}
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
						setCheckboxStatus={setCheckbox}
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
