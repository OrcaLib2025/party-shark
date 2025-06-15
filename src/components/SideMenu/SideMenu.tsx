import React from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import { useSelector } from '../../redux/store';
import { Button } from '../Button';
import { UserProfile } from '../UserProfile';

import './SideMenu.scss';

export const SideMenu: React.FC = () => {
    const navigation = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const navigateTo = (path: string) => {
        navigation(path);
    };

    console.log(user);

    return (
        <div className='menu-overview'>
            <div className='menu'>
                <div className='header'>
                    <h1>PartyShark</h1>
                </div>
                {auth.currentUser
                    ? (
                        <UserProfile
                            user= { user }
                        />
                    )
                    : (
                        <div>
                            <Button
                                type='secondary'
                                theme='light'
                                text='Войти'
                                onClick={() => navigateTo('/authorization')}
                                className='login-button'
                            />
                        </div>
                    )}
                <div className='button' onClick={() => navigateTo('/')}>Главная</div>
                <div className='button' onClick={() => navigateTo('/map')}>Карта</div>
                <div className='button' onClick={() => navigateTo('/chat')}>Чаты</div>
                <div className='button' onClick={() => navigateTo('/error')}>Настройки</div>
            </div>
        </div>
    );
};
