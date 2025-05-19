import classNames from 'classnames';
import React from 'react';

import { ButtonProps } from '../../utils/models/button';
import { Spinner } from '../Spinner';
import cl from './Button.module.scss';

export const Button: React.FC<ButtonProps> = ({
    text,
    className,
    size = 'md',
    onClick,
    icon,
    iconPosition = 'left',
    type = 'primary',
    loading = false,
    disabled = false,
    theme,
}) => {
    const isDisabled = disabled || loading;

    return (
        <button
            className={classNames(
                cl['button'],
                { [cl[`button-${type}`]]: !isDisabled },
                { [cl[`button-${type}__theme-${theme}`]]: !isDisabled },
                cl[`button__size-${size}`],
                { [cl['button-disabled']]: isDisabled },
                className,
            )}
            onClick={isDisabled ? undefined : onClick}
            disabled={isDisabled}
        >
            {loading && <Spinner />}
            {!loading && iconPosition === 'left' && icon && <span className={cl['button__icon']}>{icon}</span>}
            {!loading && text && <span className={cl['button__text']}>{text}</span>}
            {!loading && iconPosition === 'right' && icon && <span className={cl['button__icon']}>{icon}</span>}
        </button>
    );
};
