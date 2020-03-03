import React from 'react';
import classNames from 'classnames/bind';
import style from './style.scss';

const cn = classNames.bind(style);

export const Title = () => <p className={cn('title')}>хай</p>;
