import studentImage from '../../images/student-image.png';
function AboutMe() {
	return (
		<div className='student root__section'>
			<h3 className='root__header'>Студент</h3>
			<hr className='root__line'></hr>
			<div className='student__info'>
				<div className='student__info-text'>
					<h3 className='student__name'>Илья</h3>
					<h4 className='student__type'>Фронтенд-разработчик, 23 года.</h4>
					<p className='student__more'>Я родился и живу в Златоустe. Люблю слушать музыку. Недавно начал кодить.</p>
					<a className='student__link' href='https://github.com/Beorge-web'>
						Github
					</a>
				</div>
				<img className='student__image' alt='Фото студента' src={studentImage}></img>
			</div>
		</div>
	);
}

export default AboutMe;
