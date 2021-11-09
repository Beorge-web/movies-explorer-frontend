import promoLogo from '../../images/preview-logo.png';
function Promo() {
	return (
		<div className='promo root__section'>
			<div className='promo__text'>
				<h1 className='promo__title'>
					Учебный проект студента факультета <span>Веб-разработки.</span>
				</h1>
				<h3 className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h3>
				<a className='promo__more' type='button' href='#about-project'>
					Узнать больше
				</a>
			</div>
			<img className='promo__logo' alt='Глобус' src={promoLogo}></img>
		</div>
	);
}
export default Promo;
