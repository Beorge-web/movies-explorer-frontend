import { Link } from 'react-router-dom';
function Profile() {
	return (
		<div className='profile root__section'>
			<h2 className='profile__greeting'>Привет, Виталий!</h2>
			<form className='profile__form'>
				<div className='profile__section'>
					<label className='profile__label'>Имя</label>
					<input type='text' name='name' className='profile__input' placeholder='Виталий' />
				</div>
				<div className='profile__section'>
					<label className='profile__label'>E-mail</label>
					<input type='email' name='email' className='profile__input' placeholder='pochta@yandex.ru' />
				</div>
			</form>
			<div className='profile__edit'>Редактировать</div>
			<Link className='profile__logout' to='/'>Выйти из аккаунта</Link>
		</div>
	);
}
export default Profile;
