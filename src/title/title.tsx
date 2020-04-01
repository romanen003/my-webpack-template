import React from 'react';
import classNames from 'classnames/bind';
import style from './style.scss';

const cn = classNames.bind(style);

export enum TEST {
    TEST = 'TEST'
}

export const Title = () => (<p className={cn('title')}>{TEST.TEST}</p>);


