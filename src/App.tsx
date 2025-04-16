import { Route, Routes } from 'react-router-dom';
import "./App.scss";
import SideMenu from './components/SideMenu';
import { Suspense } from 'react';
import { Map } from './pages/Map';

function App() {
  const isAuth = false;

  return(
    <div className='wrapper'>
      <SideMenu />

      <div className='div1'>
        <Routes>
          <Route path="/" element={<Suspense><div className=''>1</div></Suspense>}/>
          <Route path="*" element={<Suspense><div>Egor #404 Page Not Found</div></Suspense>}/>
          <Route path="/map" element={<Suspense><Map /></Suspense>} />
          <Route path="/groups" element={<Suspense><div>Pupsya</div></Suspense>}/>

          {
            isAuth ? (
                <Route path='/profile' element={<div>Profile</div>} />
              ) : undefined
          }
        </Routes>
      </div>
    </div>
  );
}

export default App;
