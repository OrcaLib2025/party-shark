
import { Route, Routes } from 'react-router-dom';
import "./App.scss";
import SideMenu from './components/SideMenu';

function App() {
  // const navigation = useNavigate();

  // const handleHomePage = () => {
  //   void navigation("/");
  // }
  // const handleErrorPage = () => {
  //   void navigation("/bebebesbababa");
  // }
  // const handleGroupsPage = () => {
  //   void navigation("/groups");
  // }

  return(
    <div className='wrapper'>
      <SideMenu/>
      {/* <div role="presentation" className='button' onClick={handleHomePage} />
      <div role="presentation" className='button' onClick={handleErrorPage} />
      <div role="presentation" className='button' onClick={handleGroupsPage} /> */}
      <div className = 'div1'>
        <Routes>
          <Route path="/" element={<div className=''>1</div>}/>
          <Route path="*" element={<div>Egor #404 Page Not Found</div>}/>
          <Route path="/groups" element={<div>Pupsya</div>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App
