import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase';
import { setUser } from '../../redux/actions/auth';
import { User } from '../../utils/models/AuthData';
import upload from '../../utils/upload';
import { Icon } from '../Icon';

import cl from './UserProfile.module.scss';

interface UserProfileProps {
    user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentProfilePicture, setCurrentProfilePicture] = useState<string | undefined>(user.profilePicture || '');
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Ошибка при выходе из аккаунта');
        }
    };

    const handleNewProfilePicture = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];

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
            const previewUrl = URL.createObjectURL(file);
            setCurrentProfilePicture(previewUrl);

            const downloadURL = await upload(file, { type: 'profilePictures' }, (progress) => {
                setUploadProgress(progress);
            });

            setCurrentProfilePicture(downloadURL);
            dispatch(setUser({
                ...user,
                profilePicture: downloadURL,
            }));
            await updateDoc(doc(db, 'users', user.uid), {
                profilePicture: downloadURL,
            });
            toast.success('Аватар успешно обновлен');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            toast.error('Ошибка при загрузке аватара');
            setCurrentProfilePicture(user.profilePicture);
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
        <div className={cl['user-profile-container']}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleNewProfilePicture}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <div className={cl['profile-content']}>
                <div
                    className={classnames(cl['avatar'], {
                        [cl['uploading']]: isUploading,
                    })}
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
                                    <div className={cl['upload-progress']}>
                                        <div
                                            className={cl['progress-bar']}
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                        <span>{uploadProgress}%</span>
                                    </div>
                                )}
                            </>
                        )
                        : (
                            <div className={cl['default-avatar']} title="Нажмите для смены аватара">
                                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                </div>
                <div className={cl['user-info']}>
                    <span className={cl['user-name']}>{user.username || 'User'}</span>
                    {user.email && <span className={cl['user-email']}>{user.email}</span>}
                </div>
            </div>
            <div className={cl['menu-icon-container']} ref={menuRef}>
                <Icon
                    icon="dots"
                    size="md"
                    onClick={toggleMenu}
                    className={cl['menu-icon']}
                    disabled={isUploading}
                />

                {isMenuOpen && (
                    <div className={cl['dropdown-menu']}>
                        <div
                            className={cl['menu-item']}
                            onClick={() => {
                                handleSettings();
                                setIsMenuOpen(false);
                            }}
                        >
                            Настройки
                        </div>
                        <div
                            className={cl['menu-item']}
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
        </div>
    );
};
