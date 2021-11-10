function Portfolio() {
	return (
		<div className='portfolio root__section'>
			<h4 className='portfolio__header'>Портфолио</h4>
			<div className='portfolio-links'>
				<a className='portfolio__site' href='https://beorge-web.github.io/how-to-learn/'>
					<p className='portfolio__link'>Статичный сайт</p>
					<p className='portfolio__arr'>
						&#8599;
					</p>
				</a>
				<a className='portfolio__site' href='https://beorge-web.github.io/russian-travel/'>
					<p className='portfolio__link'>Адаптивный сайт</p>
					<p className='portfolio__arr'>
						&#8599;
					</p>
				</a>
				<a className='portfolio__site' href='https://beorge-web.github.io/react-mesto-auth/'>
					<p className='portfolio__link'>Одностраничное приложение</p>
					<p className='portfolio__arr'>
						&#8599;
					</p>
				</a>
			</div>
		</div>
	);
}

export default Portfolio;
