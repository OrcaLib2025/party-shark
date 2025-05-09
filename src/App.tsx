import { Navigate, Route, Routes } from 'react-router-dom';
import "./App.scss";
import SideMenu from './components/SideMenu';
import { Suspense, useEffect, useState } from 'react';
import { Map } from './pages/Map';
import { Chat } from './pages/Chat';
import { Login, Register } from './pages/Auth';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from './firebase'

function App() {
  const isAuth = false;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (user) console.log('Зарегистрирован ', user)
        else console.log('Не зареган');
    });

    return () => unsubscribe();
  }, [user]);

  return(
    <div className='wrapper'>
      <SideMenu />

      <div className='div1'>
        <Routes>
          <Route path="/" element={<Suspense><div className=''>1</div></Suspense>}/>
          <Route path="/chat" element={
            user ? (
            <Suspense><Chat /></Suspense>
            ) : (
              <Navigate to ='/login' />
            )
            }/>
          <Route path="/map" element={<Suspense><Map /></Suspense>} />
          <Route path="/login" element={<Suspense><Login /></Suspense>} />
          <Route path="/register" element={<Suspense><Register /></Suspense>} />
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
