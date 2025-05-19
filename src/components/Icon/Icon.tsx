import React from 'react';
import classnames from 'classnames';

import { IconProps } from '../../utils/models/icon';

import cl from './Icon.module.scss';

export const Icon: React.FC<IconProps> = ({
    icon,
    size = 'md',
    color,
    className,
    onClick,
    disabled,
}) => {
    const iconClasses = classnames(
        cl['icon'],
        cl[`icon-${icon}`],
        cl[`icon--${size}`],
        { [cl['icon--disabled']]: disabled },
        className,
    );

    const iconStyle: React.CSSProperties = {};
    if (color) {
        iconStyle.color = color;
    }

    return (
        <div
            className={iconClasses}
            style={iconStyle}
            onClick={onClick}
            role="button"
            tabIndex={0}
        />
    );
};
