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
        <div className={cl['login-page']}>
            <div className={cl['container']}>
                <div className={cl['header']}>
                    <h1>Welcome Back</h1>
                    <p>Please enter your details to sign in</p>
                </div>

                <div className={cl['form-group']}>
                    <Input
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder="Email Address"
                        theme="light"
                        size="default"
                    />

                    <Input
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                        placeholder="Password"
                        theme="light"
                        min={6}
                    />
                </div>

                <Button
                    type="primary"
                    theme="light"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    text={isLoading ? 'Signing in...' : 'Sign In'}
                />

                <div className={cl['divider']}>
                    <span>or</span>
                </div>

                <Button
                    type="secondary"
                    theme="light"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    text='Continue with Google'
                />

                <div className={cl['footer']}>
                    Don&apos;t have an account? <a href="/register">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
