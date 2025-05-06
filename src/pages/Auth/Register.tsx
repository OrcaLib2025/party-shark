import React, { FormEvent, useState } from "react";
import styles from './Auth.module.scss';
import { useNavigate, Link } from "react-router-dom";
import { FormData } from '../../utils/models/AuthData';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from '../../firebase';

type RegisterProps = {
    onSubmit?: (formData: Omit<FormData, 'error'>) => void;
};

export const Register: React.FC<RegisterProps> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        error: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const auth = getAuth(app);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            error: null, // Сбрасываем ошибку при изменении
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { email, password, username } = formData;

        try {
            // Создаем пользователя
            await createUserWithEmailAndPassword(auth, email, password);
            
            // Обновляем профиль
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: username
                });
            }

            // Перенаправляем и вызываем onSubmit
            navigate('/');
            onSubmit?.({ email, password, username });

        } catch (error) {
            setFormData(prev => ({
                ...prev,
                error: error instanceof Error ? error : new Error('Registration failed'),
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const { email, username, password, error } = formData;
    
    return (
        <div className={styles.auth__container}>
            <h1>Register your account</h1>
            {error && <p className={styles.error_message}>{error.message}</p>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    minLength={6}
                />
                
                <button
                    type="submit"
                    className={styles.general_submit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating account...' : 'Get Started'}
                </button>
                
                <p className={styles.login_redirect}>
                    Already have an account?{' '}
                    <Link to="/login" className={styles.login_link}>
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;