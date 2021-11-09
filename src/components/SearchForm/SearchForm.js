import searchImg from '../../images/search-icon.svg';
function SearchForm() {
	return (
		<div className='search root__section'>
			<form className='search__form'>
				<input type='search' placeholder='Фильм' className='search__input'></input>
				<button type='button' className='search__button'>
					<img className='search__image' src={searchImg} alt='Поиск'></img>
				</button>
			</form>
			<div className='search__options'>
				<label className='search__checkbox'>
					<input type='checkbox' className='search__options-input' />
					<span className='search__slider'></span>
				</label>
				<p className='search__options-name'>Короткометражки</p>
			</div>
			<hr className="root__line root__line_black"/>
		</div>
	);
}
export default SearchForm;
