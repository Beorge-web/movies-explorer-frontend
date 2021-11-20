class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
		this._credentials = config.credentials;
	}
	getMyMovies() {
		return fetch(this._url + '/movies', {
			method: 'GET',
			headers: this._headers,
			credentials: this._credentials,
		}).then((res) => this._getResponseData(res));
	}
	patchProfile(data) {
		return fetch(this._url + '/users/me', {
			method: 'PATCH',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify({
				name: data.name,
				email: data.email,
			}),
		}).then((res) => this._getResponseData(res));
	}
	addMovie(data) {
		return fetch(this._url + '/movies', {
			method: 'POST',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify({
				country: data.country || 'Неизвестно',
				director: data.director || 'Неизвестно',
				duration: data.duration,
				year: data.year,
				description: data.description,
				image: 'https://api.nomoreparties.co' + data.image.url,
				trailer: data.trailerLink,
				thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url + data.image.formats.thumbnail.ext,
				movieId: data.id,
				nameRU: data.nameRU || 'Неизвестно',
				nameEN: data.nameEN || 'Неизвестно',
			}),
		}).then((res) => this._getResponseData(res));
	}
	deleteMovie(id) {
		return fetch(this._url + '/movies/' + id, {
			method: 'DELETE',
			headers: this._headers,
			credentials: this._credentials,
		}).then((res) => this._getResponseData(res));
	}
	_rendering(button, isLoading) {
		if (isLoading === true) {
			button.textContent = 'Сохранение...';
		} else {
			button.textContent = 'Сохранить';
		}
	}
	signUp(data) {
		return fetch(this._url + '/signup', {
			method: 'POST',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify({
				password: data.password,
				email: data.email,
				name: data.name,
			}),
		}).then((res) => this._getResponseData(res));
	}
	signIn(data) {
		return fetch(this._url + '/signin', {
			method: 'POST',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify({
				password: data.password,
				email: data.email,
			}),
		}).then((res) => this._getResponseData(res));
	}
	logOut(data) {
		return fetch(this._url + '/signout', {
			method: 'POST',
			headers: this._headers,
			credentials: this._credentials,
		}).then((res) => this._getResponseData(res));
	}
	getToken() {
		return fetch(this._url + '/users/me', {
			method: 'GET',
			headers: this._headers,
			credentials: this._credentials,
		}).then((res) => this._getResponseData(res));
	}
	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}
}
const apiData = {
	url: 'https://api.beorge-movies.nomoredomains.monster',
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
	},
};
const MainApi = new Api(apiData);
export default MainApi;
