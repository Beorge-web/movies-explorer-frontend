import React from 'react';
import likeActive from '../../images/active-like-icon.svg';
import like from '../../images/like-icon.svg';
import removeCard from '../../images/remove-icon.svg';
import { Switch, Route } from 'react-router-dom';
function MovieCard({ movie, onLike, onRemove }) {
	const [isCardLiked, setCardLiked] = React.useState(false);
	React.useEffect(() => {
		setCardLiked(movie.liked ? true : false);
	}, [movie.liked]);
	let hours = 0;
	let minutes = 0;
	if (movie.duration >= 60) {
		hours = (movie.duration / 60) | 0;
		minutes = movie.duration % 60;
	} else minutes = movie.duration % 60;
	let movieImage = !!movie.image.url ? 'https://api.nomoreparties.co' + movie.image.url : movie.image;

	function handleLikeClick() {
		onLike(isCardLiked, movie);
		console.log(isCardLiked);
	}
	const cardLikeSvg = isCardLiked && movie.liked === true ? likeActive : like;
	function handleCardClick() {
		window.open(movie.trailerLink, '_blank');
	}
	function handleRemoveClick() {
		onRemove(movie);
	}
	return (
		<Switch>
			<Route path='/'>
				<div className='card-list__item'>
					<button
						target='_blank'
						onClick={handleCardClick}
						className='card-list__photo'
						style={{
							backgroundImage: `url("${movieImage}")`,
						}}
					/>
					<div className='card-list__text-box'>
						<p className='card-list__text'>{movie.nameRU}</p>
						<Route exact path='/movies'>
							<button type='button' className='card-list__like' onClick={handleLikeClick}>
								<img className='card-list_like-icon' src={cardLikeSvg} alt='Иконка лайка' />
							</button>
						</Route>
						<Route path='/saved-movies'>
							<button type='button' className='card-list__remove' onClick={handleRemoveClick}>
								<img className='card-list_remove-icon' src={removeCard} alt='Иконка лайка' />
							</button>
						</Route>
					</div>
					<hr className='card-list__line' />
					<p className='card-list__dutarion'>{`${hours > 0 ? hours + 'ч' : ''} ${minutes}м`}</p>
				</div>
			</Route>
		</Switch>
	);
}
export default MovieCard;
