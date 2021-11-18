import React from 'react';
import { useLocation } from 'react-router';
import searchImg from '../../images/search-icon.svg';

function SearchForm(props) {
	const path = useLocation();
	const [searchInput, setSearchInput] = React.useState('');
	const [sliderStatus, setSliderStatus] = React.useState(false);
	React.useEffect(() => {
		setSearchInput('');
	}, [path.pathname]);
	function handleSearchInput(event) {
		setSearchInput(event.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		path.pathname === '/movies' ? props.onSearch(searchInput, sliderStatus) : props.onSavedSearch(searchInput, sliderStatus);
	}
	function handleSlider() {
		setSliderStatus(!sliderStatus);
	}
	return (
		<div className='search root__section'>
			<form className='search__form' onSubmit={handleSubmit}>
				<input placeholder='Фильм' className='search__input' value={searchInput} onChange={handleSearchInput} required minLength='3'></input>
				<button type='submit' className='search__button'>
					<img className='search__image' src={searchImg} alt='Поиск'></img>
				</button>
			</form>
			<div className='search__options'>
				<label className='search__checkbox'>
					<input type='checkbox' className='search__options-input' checked={sliderStatus} onChange={handleSlider} />
					<span className='search__slider'></span>
				</label>
				<p className='search__options-name'>Короткометражки</p>
			</div>
			<hr className='root__line root__line_black' />
			<p className={`serch__result-status ${props.noResultsStatus ? 'serch__result-status_active' : ''}`}>Ничего не найдено</p>
		</div>
	);
}
export default SearchForm;
