/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/header-logo.png';
import accountLogo from '../../images/account-logo.svg';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
function Header() {
	const [mobileMode, setMobileMode] = React.useState(window.innerWidth >= 1000 ? false : true);
	const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	React.useEffect(() => {
		function handleResize() {
			setMobileMode(window.innerWidth >= 1000 ? false : true);
		}
		window.addEventListener('resize', handleResize);
	}, []);
	let headerBurgerClassName = mobileMode ? 'header__burger' : 'header__burger header__burger_hidden';
	let headerMenuClassName = mobileMode ? 'header__movies header__movies_hidden' : 'header__movies';
	function handleBurgerClick() {
		setMobileMenuOpen(true);
	}
	function handleCloseClick() {
		setMobileMenuOpen(false);
	}
	function handleLinkClick() {
		setMobileMenuOpen(false);
	}
	return (
		<Switch>
			<Route exact path='/'>
				<header className='header root__section'>
					<Link to='/' className='header__logo-link'>
						<img className='header__logo' src={logo} alt='Логотип'></img>
					</Link>
					<ul className='header__menu'>
						<li className='header__signup'>
							<Link to='/signup' className='header__menu-link'>
								Регистрация
							</Link>
						</li>
						<li className='header__signin'>
							<Link to='/signin' className='header__menu-link'>
								Войти
							</Link>
						</li>
					</ul>
				</header>
			</Route>
			<Route exact path={['/movies', '/saved-movies', '/profile']}>
				<header className='header header_black root__section'>
					<button className={headerBurgerClassName} onClick={handleBurgerClick}></button>
					<Link to='/' className='header__logo-link'>
						<img className='header__logo' src={logo} alt='Логотип'></img>
					</Link>
					<div className={isMobileMenuOpen ? 'header__movies-background' : 'header__movies-background_hidden'}></div>
					<div className={isMobileMenuOpen ? `header__movies_open ${headerMenuClassName}` : headerMenuClassName}>
						<button
							className={isMobileMenuOpen && mobileMode ? 'header__close-button' : 'header__close-button header__close-button_hidden'}
							onClick={handleCloseClick}></button>
						<nav className='header__nav'>
							<div className='header_nav-movies'>
								<Link to='/' className={isMobileMenuOpen ? 'header__link' : 'header__link header__link_hidden'} onClick={handleLinkClick}>
									Главная
								</Link>

								<NavLink exact to='/movies' className='header__link' activeClassName='header__link_selected' onClick={handleLinkClick}>
									Фильмы
								</NavLink>
								<NavLink exact to='/saved-movies' className='header__link' activeClassName='header__link_selected' onClick={handleLinkClick}>
									Сохраненные фильмы
								</NavLink>
							</div>

							<Link className='header__account-link' to='/profile' onClick={handleLinkClick}>
								<div className='header__account'>Аккаунт</div>
								<img className='header__account-logo' src={accountLogo} alt='Аватар' />
							</Link>
						</nav>
					</div>
				</header>
			</Route>
			<Route path='/signup'>
				<header className='header header__auth'>
					<Link to='/' className='header__logo-link'>
						<img className='header__logo header__logo_auth' src={logo} alt='Логотип'></img>
					</Link>
					<h2 className='header__greeting'>Добро пожаловать!</h2>
				</header>
			</Route>
			<Route path='/signin'>
				<header className='header header__auth'>
					<Link to='/' className='header__logo-link'>
						<img className='header__logo header__logo_auth' src={logo} alt='Логотип'></img>
					</Link>
					<h2 className='header__greeting'>Рады видеть!</h2>
				</header>
			</Route>
		</Switch>
	);
}
export default Header;
