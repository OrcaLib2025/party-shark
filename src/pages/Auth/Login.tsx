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

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { auth, provider } from '../../firebase';
import { setAuth } from '../../redux/actions/auth';

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
                .then(void dispatch(setAuth(true)))
                .catch(void dispatch(setAuth(false)));
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
