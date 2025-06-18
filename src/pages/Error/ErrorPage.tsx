import React from 'react';

import cl from './Error.module.scss';

export const ErrorPage: React.FC = () => {
    return (
        <div className={cl['error-page']}>
            <h1>Ошибка 404</h1>
            <p>Страницы по данной ссылки не обнаружено</p>
            <p>:(</p>
        </div>
    );
};
