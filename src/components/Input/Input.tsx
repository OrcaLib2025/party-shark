import React from 'react';
import classnames from 'classnames';
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
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={cl['input-container']}>
            {label && <label className={cl['input-label']}>{label}</label>}
            <div className={cl['input-wrapper']}>
                <input
                    type={type}
                    min={min ? min : undefined}
                    max={max ? max : undefined}
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
