/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { auth, db, provider } from '../../firebase';

import cl from './Auth.module.scss';

export const Login = () => {
    const dispatch = useDispatch();
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
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                navigate('/');
                toast.success('Успешно!');
            }).catch((error) => {
                console.log(error);
                toast.error('Произошла ошибка');
            });
    };

    return (
        <div className={cl['container']}>
            <h1>Register your account</h1>
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
                text={'Войти с гугла'}
            />
        </div>
    );
};

export default Login;
