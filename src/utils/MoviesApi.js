class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}
	getMovies() {
		return fetch(this._url, {
			method: 'GET',
			headers: this._headers,
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
	url: 'https://api.nomoreparties.co/beatfilm-movies',
	headers: {
		'Content-Type': 'application/json',
	},
};
const MoviesApi = new Api(apiData);
export default MoviesApi;
