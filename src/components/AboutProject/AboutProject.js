function AboutProject() {
	return (
		<div className='about root__section' id='about-project'>
			<h2 className='root__header'>О проекте</h2>
			<hr className='root__line'></hr>
			<div className='about__text'>
				<div className='about__column'>
					<h4 className='about__text-title'>Дипломный проект включал 5 этапов</h4>
					<p className='about__text-subtitle'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
				</div>
				<div className='about__column'>
					<h4 className='about__text-title'>На выполнение диплома ушло 5 недель</h4>
					<p className='about__text-subtitle'>
						У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
					</p>
				</div>
			</div>
			<div className='about__time'>
				<div className='about__backend'>
					<div className='about__backend-time'>1 неделя</div>
					<p className='about__description'>Back-end</p>
				</div>
				<div className='about__frontend'>
					<div className='about__frontend-time'>4 недели</div>
					<p className='about__description'>Front-end</p>
				</div>
			</div>
		</div>
	);
}
export default AboutProject;
