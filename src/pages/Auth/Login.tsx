/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
 } from 'firebase/auth'
import { auth, provider } from '../../firebase';
import { Input } from "../../components/Input";
import { Button } from "../../components/Button"
import cl from './Auth.module.scss';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/actions/auth";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)

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
        } catch (error) {
            console.log(error);
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
        }).catch((error) => {
            console.log(error);
        })
    }

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
}

export default Login;