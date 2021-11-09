import React from 'react';
import likeActive from '../../images/active-like-icon.svg';
import like from '../../images/like-icon.svg';
import removeCard from '../../images/remove-icon.svg';
import { Switch, Route } from 'react-router-dom';
function MovieCard() {
	const [isCardLiked, setCardLiked] = React.useState(false);
	function handleLikeClick() {
		!isCardLiked ? setCardLiked(true) : setCardLiked(false);
	}
	const cardLikeSvg = isCardLiked ? likeActive : like;
	return (
		<Switch>
			<div className='card-list__item'>
				<div className='card-list__photo' />
				<div className='card-list__text-box'>
					<p className='card-list__text'>33 слова о дизайне</p>
					<Route exact path='/movies'>
						<button type='button' className='card-list__like' onClick={handleLikeClick}>
							<img className='card-list_like-icon' src={cardLikeSvg} alt='Иконка лайка' />
						</button>
					</Route>
					<Route path='/saved-movies'>
					<button type='button' className='card-list__remove' onClick={handleLikeClick}>
							<img className='card-list_remove-icon' src={removeCard} alt='Иконка лайка' />
						</button>
					</Route>
				</div>
				<hr className='card-list__line' />
				<p className='card-list__dutarion'>1ч 42м</p>
			</div>
		</Switch>
	);
}
export default MovieCard;
