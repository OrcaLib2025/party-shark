import "./SideMenu.scss"
import { useNavigate } from "react-router-dom";
// import { useNavigate, Routes, Route } from 'react-router-dom';
export const SideMenu = () => {

    const navigation = useNavigate();

    const handleHomePage = () => {
        void navigation("/");
    }
    const handleErrorPage = () => {
        void navigation("/bebebesbababa");
    }
    const handleGroupsPage = () => {
        void navigation("/groups");
    }
    return (
        <div className='menu-overview'>
            <div className='menu'>
                <div className='header'>
                    <h1>PartyShark</h1>
                </div>
                <div className='button' onClick={handleHomePage}>Главная</div>
                <div className='button' onClick={handleErrorPage}>Карта</div>
                <div className='button' onClick={handleGroupsPage}>Чаты</div>
                <div className='button' onClick={handleHomePage}>Мероприятия</div>
                <div className='button' onClick={handleHomePage}>Настройки</div>
                {/* <Routes>
                <Route path="/" element={<div className='1'>1</div>} />
                <Route path="*" element={<div>Egor #404 Page Not Found</div>} />
                <Route path="/groups" element={<div>Pupsya</div>} />
            </Routes> */}
            </div>
        </div>
    );
}