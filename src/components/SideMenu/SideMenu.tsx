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

    const handleHomePage = () => {
        navigation('/');
    };

    const handleErrorPage = () => {
        navigation('/bebebesbababa');
    };

    const handleChatPage = () => {
        navigation('/chat');
    };

    const handleMapPage = () => {
        navigation('/map');
    };

    const handleAuthorization = () => {
        navigation('/authorization');
    };

    return (
        <div className='menu-overview'>
            <div className='menu'>
                <div className='header'>
                    <h1>PartyShark</h1>
                </div>
                {auth.currentUser
                    ? (
                        <UserProfile
                            user= { {
                                username: user.username,
                                uid: user.uid,
                                email: user.email,
                                blocked: user.blocked,
                            } }
                        />
                    )
                    : (
                        <div>
                            <Button
                                type='secondary'
                                theme='light'
                                text='Войти'
                                onClick={handleAuthorization}
                                className='login-button'
                            />
                        </div>
                    )}
                <div className='button' onClick={handleHomePage}>Главная</div>
                <div className='button' onClick={handleMapPage}>Карта</div>
                <div className='button' onClick={handleChatPage}>Чаты</div>
                <div className='button' onClick={handleHomePage}>Мероприятия</div>
                <div className='button' onClick={handleErrorPage}>Настройки</div>
            </div>
        </div>
    );
};
