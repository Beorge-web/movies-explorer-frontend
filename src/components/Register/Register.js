import { Link } from 'react-router-dom';
function Register() {
	return (
		<div className='auth'>
			<form className='auth__form'>
				<div className='auth__field'>
					<label className='auth__label'>Имя</label>
					<input type='text' className='auth__input' />
					<span className='auth__input-error'>' '</span>
				</div>
				<div className='auth__field'>
					<label className='auth__label'>E-mail</label>
					<input type='email' className='auth__input' />
					<span className='auth__input-error'>' '</span>
				</div>
				<div className='auth__field'>
					<label className='auth__label'>Пароль</label>
					<input type='password' className='auth__input' />
					<span className='auth__input-error auth__input-error_active'>Что-то пошло не так...</span>
				</div>

				<Link to='/signin'>
					<button type='submit' className='auth__button'>
						Зарегистрироваться
					</button>
				</Link>
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
