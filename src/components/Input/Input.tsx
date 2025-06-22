import React, { forwardRef } from 'react';
import classnames from 'classnames';

import { InputProps } from '../../utils/models/input';

import cl from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    onFocus,
    type = 'text',
    label,
    placeholder,
    value,
    min,
    max,
    onChange,
    onKeyDown,
    size = 'default',
    theme,
    classNames,
    disabled,
}, ref) => {
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
                    ref={ref}
                    type={type}
                    min={min || undefined}
                    max={max || undefined}
                    className={classnames(cl['input'], cl[`input-${size}`], cl[`input__theme-${theme}`], { [cl['input-focused']]: !!onFocus })}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    disabled={disabled}
                />
            </div>
        </div>
    );
});

Input.displayName = 'Input';
