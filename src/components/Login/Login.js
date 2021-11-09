import { Link } from 'react-router-dom';

function Login() {
	return (
		<div className='auth'>
			<form className='auth__form'>
				<div className='auth__field'>
					<label className='auth__label'>E-mail</label>
					<input type='email' className='auth__input' />
					<span className='auth__input-error'>' '</span>
				</div>
				<div className='auth__field'>
					<label className='auth__label'>Пароль</label>
					<input type='password' className='auth__input' />
					<span className='auth__input-error'>' '</span>
				</div>
				<Link to='/movies'>
					<button type='submit' className='auth__button'>
						Войти
					</button>
				</Link>
			</form>
			<div className='auth__note'>
				Еще не зарегистрированы?
				<Link className='auth__link' to='/signup'>
					Регистрация
				</Link>
			</div>
		</div>
	);
}
export default Login;
