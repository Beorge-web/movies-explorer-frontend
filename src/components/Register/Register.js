import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/FormValidation';
function Register(props) {
	const { handleChange, values, resetForm, errors, isValid } = useFormWithValidation({});
	React.useEffect(() => {
		resetForm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	function handleSubmit(event) {
		event.preventDefault();
		props.onUpdate(values);
	}
	console.log(values);
	return (
		<div className='auth'>
			<form className='auth__form' onSubmit={handleSubmit}>
				<div className='auth__field'>
					<label className='auth__label'>Имя</label>
					<input type='text' className='auth__input' name='name' value={values.name || ''} onChange={handleChange} required minLength='3' />
					<span className={errors.name === '' ? 'auth__input-error' : 'auth__input-error auth__input-error_active'}>{errors.name}</span>
				</div>
				<div className='auth__field'>
					<label className='auth__label'>E-mail</label>
					<input type='email' className='auth__input' name='email' value={values.email || ''} onChange={handleChange} minLength='4' />
					<span className={errors.email === '' ? 'auth__input-error' : 'auth__input-error auth__input-error_active'}>{errors.email}</span>
				</div>
				<div className='auth__field'>
					<label className='auth__label'>Пароль</label>
					<input type='password' className='auth__input' name='password' value={values.password || ''} onChange={handleChange} minLength='8' />
					<span className={errors.password === '' ? 'auth__input-error' : 'auth__input-error auth__input-error_active'}>{errors.password}</span>
				</div>
				<button type='submit' className='auth__button' disabled={isValid ? false : true}>
					Зарегистрироваться
				</button>
				<span className={!props.authError ? 'auth__input-error' : 'auth__input-error auth__input-error_active'}>{props.authError}</span>
			</form>
			<div className='auth__note'>
				Уже зарегистрированы?
				<Link className='auth__link' to='/signin'>
					Вход
				</Link>
			</div>
		</div>
	);
}
export default Register;