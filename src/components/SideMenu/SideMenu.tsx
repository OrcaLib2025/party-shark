import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SideMenu.scss';

export const SideMenu: React.FC = () => {
    const navigation = useNavigate();
    const isAuth = false;

    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const handleHomePage = () => {
        void navigation("/");
    };

    const handleErrorPage = () => {
        void navigation("/bebebesbababa");
    };

    const handleChatPage = () => {
        void navigation("/chat");
    };

    const handleMapPage = () => {
        void navigation('/map');
    };

    const handleAuthorization = () => {
        void navigation('/authorization');
    }

    return (
        <div className='menu-overview'>
            <div className='menu'>
                <div className='header'>
                    <h1>PartyShark</h1>
                </div>
                {
                    isAuthOpen ? (
                        <div
                            role="presentation"
                            className='auth-body'
                            onClick={handleAuthorization}
                        >
                            {
                                !isAuth && (
                                    <div className='user-profile'>
                                        <div className='head' />
                                        <div className='body' />
                                    </div>
                                )
                            }
                            {isAuth && <div>ТУТ ИКОНКУ ЮЗЕРА</div>}

                            <span>
                                Sign in
                            </span>
                        </div>
                    ) : null
                }
                <div className='auth-container'>
                    <div
                        className='auth-container__button'
                        onClick={() => { setIsAuthOpen(!isAuthOpen) }}
                    >
                        {
                            isAuthOpen ? (
                                'Close'
                            ) : 'Sign in'
                        }
                    </div>
                </div>
                <div className='button' onClick={handleHomePage}>Главная</div>
                <div className='button' onClick={handleMapPage}>Карта</div>
                <div className='button' onClick={handleChatPage}>Чаты</div>
                <div className='button' onClick={handleHomePage}>Мероприятия</div>
                <div className='button' onClick={handleErrorPage}>Настройки</div>
            </div>
        </div>
    );
}