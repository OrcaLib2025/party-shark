import './SideMenu.scss';
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase"
import { Button } from '../Button';

export const SideMenu = () => {
    const navigation = useNavigate();

    const handleHomePage = () => {
        void navigation("/");
    };

    const handleErrorPage = () => {
        void navigation("/bebebesbababa");
    };

    const handleChatPage = () => {
        void navigation("/chat");
    };

    const handleMapPage = () => {
        void navigation('/map');
    };
    const handleRegisterPage = () => {
        void navigation('/register');
    };

    const handleLoginPage = () => {
        void navigation('/login');
    };
    const handleLogOutUser = async () => {
        try {
            await signOut(auth);
            void navigation('/');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };


    return (
        <div className='menu-overview'>
            <div className='menu'>
                <div className='header'>
                    <h1>PartyShark</h1>
                </div>
                <div className='button' onClick={handleHomePage}>Главная</div>
                <div className='button' onClick={handleMapPage}>Карта</div>
                <div className='button' onClick={handleChatPage}>Чаты</div>
                <div className='button' onClick={handleHomePage}>Мероприятия</div>
                <div className='button' onClick={handleErrorPage}>Настройки</div>
                {auth.currentUser
                    ? (<Button
                        type="secondary"
                        theme="light"
                        className='logout'
                        onClick={handleLogOutUser}
                        text='Выйти из аккаунта'
                    />)
                    : (
                        <>
                            <div className='button' onClick={handleRegisterPage}>Регистрация</div>
                            <div className='button' onClick={handleLoginPage}>Логин</div>
                        </>
                    )}
            </div>
        </div>
    );
}