import React from 'react';
import classNames from 'classnames/bind'
// @ts-ignore
import style from './style.scss';
import ReactDOM from 'react-dom';
import { Title } from "./title/title";

const cn = classNames.bind(style);

const App = () => {
	return (
		<div className={cn('title')}>
			<Title />
		</div>
	);
};

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

