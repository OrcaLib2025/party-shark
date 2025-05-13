import { Navigate, Route, Routes } from 'react-router-dom';
import "./App.scss";
import SideMenu from './components/SideMenu';
import { Suspense, useEffect, useState } from 'react';
import { Map } from './pages/Map';
import { Chat } from './pages/Chat';
import { Authorization } from './pages/Authorization';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from './firebase'
import { Messenger } from './pages/Chat/Messenger';
import { AddNewEvent } from './pages/Map/router/AddNewEvent';

function App() {
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      setLoading(false);
      if (user) console.log('Зарегистрирован ', user)
      else console.log('Не зареган');
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className='wrapper'>
      <SideMenu />

      <div className='div1'>
        <Routes>
          <Route path="/" element={<Suspense><div className=''>1</div></Suspense>} />
          <Route path="/authorization" element={<Suspense><Authorization /></Suspense>} />
          <Route path="/chat" element={
            user ? (
              <Suspense><Chat /></Suspense>
            ) : (
              <Navigate to='/authorization' />
            )
          } />
          <Route path="/map" element={<Suspense><Map /></Suspense>} />
          <Route path="/groups" element={<Suspense><div>1</div></Suspense>} />
          <Route path="/messenger" element={<Suspense><Messenger></Messenger></Suspense>} />

          {
            user ? (
              <>
                <Route path='/profile' element={<div>Profile</div>} />
                <Route path='/add-event' element={<AddNewEvent />} />
              </>
            ) : undefined
          }
        </Routes>
      </div>
    </div>
  );
}

export default App;
