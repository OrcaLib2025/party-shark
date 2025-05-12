import React, { useState } from "react";
import cl from './Auth.module.scss';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { Input } from "../../components/Input";
import { Button } from "../../components/Button"
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/actions/auth";


export const Register: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            const res = await createUserWithEmailAndPassword(auth, email, password)
            dispatch(setAuth(true));

                await setDoc(doc(db, "users", res.user.uid), {
                    username,
                    email,
                    id: res.user.uid,
                    blocked: [],
                });
            navigate('/');

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={cl['container']}>
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
                onClick={handleSubmit}
                disabled={isLoading}
                text={isLoading ? 'Creating account...' : 'Get Started'}
            />
        </div >
    );
};

export default Register;