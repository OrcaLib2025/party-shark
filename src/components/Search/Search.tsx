import React from 'react';
import cl from './Search.module.scss';
import classnames from 'classnames';
import { Icon } from '../Icon';
import { SearchProps } from '../../utils/models/search';

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