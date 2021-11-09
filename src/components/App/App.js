import Header from '../Header/Header';
import Main from '../Main/Main';
import { Route, Switch } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
function App() {
	return (
		<div className='root'>
			<Header />
			<Switch>
				<Route path='/' exact>
					<Main />
				</Route>
				<Route path='/movies' exact>
					<Movies />
				</Route>
				<Route path='/saved-movies' exact>
					<SavedMovies />
				</Route>
				<Route path='/profile' exact>
					<Profile />
				</Route>
				<Route path='/signup' exact>
					<Register />
				</Route>
				<Route path='/signin' exact>
					<Login />
				</Route>
				<Route path='*' exact>
					<NotFound />
				</Route>
			</Switch>
			
		</div>
	);
}

export default App;
