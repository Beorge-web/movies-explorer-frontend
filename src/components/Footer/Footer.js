function Footer() {
	return (
		<footer className='footer root__section'>
			<p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
			<div className='footer__bottom'>
				<div className='footer__date'>&copy; 2021</div>
				<ul className='footer__links'>
					<li className="footer__link-item">
						<a className='footer__link-name' href='https://practicum.yandex.ru/'>
							Яндекс.Практикум
						</a>
					</li>
					<li className="footer__link-item">
						<a className='footer__link-name' href='https://github.com/'>
							Github
						</a>
					</li>
					<li className="footer__link-item">
						<a className='footer__link-name' href='https://ru-ru.facebook.com'>
							Facebook
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
