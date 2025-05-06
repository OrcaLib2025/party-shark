import './SideMenu.scss';
import { useNavigate } from "react-router-dom";
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
                <div className='button' onClick={handleRegisterPage}>Регистрация</div>
                <div className='button' onClick={handleLoginPage}>Логин</div>
            </div>
        </div>
    );
}