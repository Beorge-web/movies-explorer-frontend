import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../utils/FormValidation';
function Profile({ profileUpdateStatus, onLogout, ...props }) {
	const currentUser = React.useContext(CurrentUserContext);
	const [isDataRepeat, setDataRepeat] = React.useState(false);
	function repeatCheck(e) {
		const value = e.target.value;
		if (value === currentUser.name || value === currentUser.email) {
			setDataRepeat(true);
		} else setDataRepeat(false);
	}
	const { handleChange, values, resetForm, errors, isValid } = useFormWithValidation({});
	React.useEffect(() => {
		resetForm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	function handleSubmit(event) {
		event.preventDefault();
		props.onUpdate(values);
	}
	return (
		<div className='profile root__section'>
			<h2 className='profile__greeting'>Привет, {currentUser.name}</h2>
			<p className={`profile__update-status ${profileUpdateStatus ? 'profile__update-status_active' : ''}`}>Данные успешно обновлены</p>
			<form className='profile__form' onSubmit={handleSubmit}>
				<div className='profile__section'>
					<label className='profile__label'>Имя</label>
					<input
						type='text'
						name='name'
						className='profile__input'
						placeholder={currentUser.name}
						onChange={(e) => {
							handleChange(e);
							repeatCheck(e);
						}}
						minLength='3'
						required
					/>
				</div>
				<span className={errors.name === '' ? 'profile__input-error' : 'profile__input-error profile__input-error_active'}>{errors.name}</span>
				<div className='profile__section'>
					<label className='profile__label'>E-mail</label>
					<input
						type='email'
						name='email'
						className='profile__input'
						placeholder={currentUser.email}
						onChange={(e) => {
							handleChange(e);
							repeatCheck(e);
						}}
						minLength='6'
						required
					/>
				</div>
				<span className={errors.email === '' ? 'profile__input-error' : 'profile__input-error profile__input-error_active'}>{errors.email}</span>
				<button type='submit' className='profile__edit' disabled={isValid && !isDataRepeat ? false : true}>
					Редактировать
				</button>
				<button type='button' className='profile__logout' onClick={onLogout} to='/'>
					Выйти из аккаунта
				</button>
			</form>
		</div>
	);
}
export default Profile;
