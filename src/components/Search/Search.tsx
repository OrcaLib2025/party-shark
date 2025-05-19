import React from 'react';
import classnames from 'classnames';

import { SearchProps } from '../../utils/models/search';
import { Icon } from '../Icon';

import cl from './Search.module.scss';

export const Search: React.FC<SearchProps> = ({
    placeholder = 'Поиск...',
    value,
    onChange,
    theme,
    classNames,
}) => {
    return (
        <div className={classnames(cl['searcher-container'], classNames)}>
            <Icon
                icon="search"
                color={
                    theme === 'dark' ? 'white' : 'black'
                }
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={classnames(cl['search-input'], cl[`search-input-theme-${theme}`])}
            />
        </div>
    );
};
