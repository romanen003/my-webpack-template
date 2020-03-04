import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import style from './style.scss';
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

