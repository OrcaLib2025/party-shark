import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { db } from '../../firebase';
import { useSelector } from '../../redux/store';

import cl from './Profile.module.scss';

interface ProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [name, setName] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen || !user) return null;

    const handleSave = async () => {
        setIsLoading(true);

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            toast.error('Пользователь не авторизован');
            setIsLoading(false);
            return;
        }

        if (name === user.username && email === user.email) {
            toast.info('Изменений нет');
            setIsLoading(false);
            return;
        }

        try {
            await updateProfile(currentUser, {
                displayName: name,
            });

            if (email !== currentUser.email) {
                await updateEmail(currentUser, email);
            }

            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                username: name,
                email,
            });

            dispatch({
                type: 'SET_USER',
                payload: {
                    ...user,
                    username: name,
                    email,
                },
            });

            toast.success('Данные успешно обновлены');
            onClose();
        } catch (error) {
            toast.error(`Ошибка: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cl.profile}>
            <div className={cl.profile__overlay} onClick={onClose}></div>
            <div className={cl.profile__modal}>
                <div className={cl.profile__close}>
                    <Icon icon="close" onClick={onClose} />
                </div>
                <div className={cl.profile__header}>
                    <img src={user.profilePicture} alt="Аватар" className={cl.profile__avatar} />
                    <h2 className={cl.profile__name}>Редактировать профиль</h2>
                </div>
                <div className={cl.profile__body}>
                    <Input
                        value={name}
                        label="Имя:"
                        onChange={(e) => setName(e)}
                        disabled={isLoading}
                        theme={'light'}
                    />
                    <Input
                        value={email}
                        label="Email:"
                        onChange={(e) => setEmail(e)}
                        disabled={isLoading}
                        theme={'light'}
                    />
                </div>
                <div className={cl.profile__footer}>
                    <Button
                        text={isLoading ? 'Сохранение...' : 'Сохранить'}
                        type="secondary"
                        onClick={handleSave}
                        size="full"
                        theme={'light'}
                        disabled={isLoading}
                        loading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};
