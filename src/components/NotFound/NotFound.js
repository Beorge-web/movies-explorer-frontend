import { useHistory } from 'react-router-dom';

function NotFound() {
	let history = useHistory();
	function handleClick() {
		history.goBack();
	}
	return (
		<div className='notfound'>
			<h2 className='nonfound__error-code'>404</h2>
			<h4 className='notfound__error-name'>Страница не найдена</h4>
			<div className='nothfound__back' onClick={handleClick}>
				Назад
			</div>
		</div>
	);
}
export default NotFound;
