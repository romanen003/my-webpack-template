import React from 'react';
import './style.scss';
import ReactDOM from 'react-dom';
import './style.scss';

const title = 'My Minimal React Webpack Babel Setup';
const App = () => {
	console.log('run' );
	return (
		<div className='title'>{title}</div>
	);
};

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

