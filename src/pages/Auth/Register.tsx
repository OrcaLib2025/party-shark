import React, { useState } from "react";
import styles from './Auth.module.scss';
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from '../../firebase';
import { Input } from "../../components/Input";
import { Button } from "../../components/Button"
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/actions/auth";
import { useSelector } from "../../redux/store";


export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth } = useSelector((state) => state.auth);
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const auth = getAuth(app);

    const handleChangeEmail = (value: string) => {
        setEmail(value);
    };
    const handleChangeUsername = (value: string) => {
        setUsername(value);
    };
    const handleChangePassword = (value: string) => {
        setPassword(value);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            // Создаем пользователя
            await createUserWithEmailAndPassword(auth, email, password)
                .then(void dispatch(setAuth(true)))
                .catch(void dispatch(setAuth(false)));

            // Обновляем профиль
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: username
                });
            }

            // Перенаправляем и вызываем onSubmit
            navigate('/');

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    console.log(isAuth);
    return (
        <div>
            <h1>Register your account</h1>
            <Input
                theme="light"
                type="text"
                value={username}
                onChange={handleChangeUsername}
                placeholder="Username"
            />
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
                className={styles.general_submit}
                onClick={handleSubmit}
                disabled={isLoading}
                text={isLoading ? 'Creating account...' : 'Get Started'}
            />

            <p className={styles.login_redirect}>
                Already have an account?{' '}
                <Link to="/login" className={styles.login_link}>
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;