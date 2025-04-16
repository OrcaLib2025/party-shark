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

    const handleGroupsPage = () => {
        void navigation("/groups");
    };

    const handleMapPage = () => {
        void navigation('/map');
    };

    return (
        <div className='menu-overview'>
            <div className='menu'>
                <div className='header'>
                    <h1>PartyShark</h1>
                </div>
                <div className='button' onClick={handleHomePage}>Главная</div>
                <div className='button' onClick={handleMapPage}>Карта</div>
                <div className='button' onClick={handleGroupsPage}>Чаты</div>
                <div className='button' onClick={handleHomePage}>Мероприятия</div>
                <div className='button' onClick={handleErrorPage}>Настройки</div>
            </div>
        </div>
    );
}