/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { auth, db, provider } from '../../firebase';

import cl from './Auth.module.scss';

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleChangePassword = (value: string) => {
        setPassword(value);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(
                )
                .catch();
            const userDoc = doc(db, 'users', auth.currentUser ? auth.currentUser.uid : '');
            console.log(userDoc);
            const docSnap = await getDoc(userDoc);
            if (docSnap.exists()) {
                console.log('Данные из Firestore:', docSnap.data());
            } else {
                console.log('Документ не найден!');
            }
            navigate('/');
            toast.success('Успешно!');
        } catch (error) {
            console.log(error);
            toast.error('Ошибка');
        } finally {
            setIsLoading(false);
        }
    };
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Проверяем, есть ли запись пользователя в Firestore
            const userDoc = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDoc);

            if (!docSnap.exists()) {
            // Если записи нет, создаём её
                await setDoc(userDoc, {
                    username: user.displayName || user.email?.split('@')[0] || 'User',
                    email: user.email,
                    id: user.uid,
                    blocked: [],
                    profilePicture: user.photoURL || '',
                });

                // Создаём запись в userchats
                await setDoc(doc(db, 'userchats', user.uid), {
                    chats: [],
                });
            }

            navigate('/');
            toast.success('Успешно!');
        } catch (error) {
            console.log(error);
            toast.error('Произошла ошибка');
        }
    };

    return (
        <div className={cl['container']}>
            <h1>Log in your account</h1>
            <Input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Email"
                theme='light'
            />
            <Input
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Password"
                theme='light'
                min={6}
            />
            <Button
                type="secondary"
                theme="light"
                onClick={handleSubmit}
                disabled={isLoading}
                text={isLoading ? 'Creating account...' : 'Get Started'}
            />
            <Button
                type="secondary"
                theme="light"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                text={'Войти, используя Google'}
            />
        </div>
    );
};

export default Login;
