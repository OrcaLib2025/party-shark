import React, { useState } from 'react';

import cl from './Authorization.module.scss';
import Register from '../Auth/Register';
import Login from '../Auth/Login';

export const Authorization: React.FC = () => {
    const [isLog, setIsLog] = useState(true);

    return (
        <div className={cl['sss']}>
            <div className={cl['authoriz']}>
                {
                    isLog ? (
                        <Login />
                    ) : <Register />
                }

                <p>
                    {
                        isLog ? (
                            'Нет аккаунта?'
                        ) : 'Есть аккаунт?'
                    }
                    {' '}
                    <a
                        className={cl['authoriz__change']}
                        onClick={() => setIsLog(!isLog)}
                    >
                        {
                            isLog ? 'Зарегестрируйся!' : 'Войди!'
                        }
                    </a>
                </p>
            </div>
        </div>
    )
};