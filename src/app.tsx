import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import style from './style.scss';
import { Title } from './title/title';

const cn = classNames.bind(style);

const App = () => (
    <div className={cn('title')}>
        <Title />
    </div>
);

ReactDOM.render(<App />,
    document.getElementById('root'));


const obj = {
    a: 2,
    b: 3
};

export const a = (props: {a: string}) => props.a;

const b: number = 0;
