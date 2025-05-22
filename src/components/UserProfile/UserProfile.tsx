import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signOut } from 'firebase/auth';

import { auth } from '../../firebase';
import upload from '../../services/Storage/upload';
import { Icon } from '../Icon';

import './UserProfile.scss';

interface UserProfileProps {
    username?: string;
    email?: string;
    profilePicture?: string;
    isAuth: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
    username,
    email,
    profilePicture,
    isAuth,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentProfilePicture, setCurrentProfilePicture] = useState(profilePicture);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigation = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogOutUser = async () => {
        try {
            await signOut(auth);
            navigation('/');
            toast.info('Вы вышли из аккаунта');
        } catch (error) {
            console.error('Logout failed: ', error);
            toast.error('Ошибка при выходе из аккаунта');
        }
    };

    const handleNewProfilePicture = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];

        // Валидация файла
        if (!file.type.match('image.*')) {
            toast.error('Пожалуйста, выберите файл изображения');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            toast.error('Размер файла не должен превышать 5MB');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Создаем временный URL для preview
            const previewUrl = URL.createObjectURL(file);
            setCurrentProfilePicture(previewUrl);

            // Загружаем файл на сервер
            const downloadURL = await upload(file, { type: 'profilePictures' }, (progress) => {
                setUploadProgress(progress);
            });

            // Обновляем основное изображение после загрузки
            setCurrentProfilePicture(downloadURL);
            toast.success('Аватар успешно обновлен');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            toast.error('Ошибка при загрузке аватара');
            // Возвращаем предыдущее изображение при ошибке
            setCurrentProfilePicture(profilePicture);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleAvatarClick = () => {
        if (!isUploading && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSettings = () => {
        // Реализация настроек
        toast.info('Функция настроек в разработке');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="user-profile-container">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleNewProfilePicture}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <div className="profile-content">
                <div
                    className={`avatar ${isUploading ? 'uploading' : ''}`}
                    onClick={handleAvatarClick}
                >
                    {currentProfilePicture
                        ? (
                            <>
                                <img
                                    src={currentProfilePicture}
                                    alt="User avatar"
                                    title="Нажмите для смены аватара"
                                />
                                {isUploading && (
                                    <div className="upload-progress">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                        <span>{uploadProgress}%</span>
                                    </div>
                                )}
                            </>
                        )
                        : (
                            <div className="default-avatar" title="Нажмите для смены аватара">
                                {username ? username.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                </div>

                {isAuth && (
                    <div className="user-info">
                        <span className="user-name">{username || 'User'}</span>
                        {email && <span className="user-email">{email}</span>}
                    </div>
                )}
            </div>

            {isAuth && (
                <div className="menu-icon-container" ref={menuRef}>
                    <Icon
                        icon="dots"
                        size="md"
                        onClick={toggleMenu}
                        className="menu-icon"
                        disabled={isUploading}
                    />

                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <div
                                className="menu-item"
                                onClick={() => {
                                    handleSettings();
                                    setIsMenuOpen(false);
                                }}
                            >
                                Настройки
                            </div>
                            <div
                                className="menu-item"
                                onClick={() => {
                                    handleLogOutUser();
                                    setIsMenuOpen(false);
                                }}
                            >
                                Выйти из аккаунта
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
