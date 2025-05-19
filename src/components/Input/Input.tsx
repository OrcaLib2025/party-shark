import classnames from 'classnames';
import React from 'react';

import { InputProps } from '../../utils/models/input';
import cl from './Input.module.scss';

export const Input: React.FC<InputProps> = ({
    onFocus,
    type = 'text',
    label,
    placeholder,
    value,
    min,
    max,
    onChange,
    size = 'default',
    theme,
    classNames,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={classnames(cl['input-container'], classNames)}>
            {
                label &&
                <label className={cl['input-label']}>
                    {label}
                </label>
            }
            <div className={cl['input-wrapper']}>
                <input
                    type={type}
                    min={min || undefined}
                    max={max || undefined}
                    className={classnames(cl['input'], cl[`input-${size}`], cl[`input__theme-${theme}`], { [cl['input-focused']]: !!onFocus })}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onFocus={onFocus}
                />
            </div>
        </div>
    );
};
