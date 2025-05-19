import './App.scss';

import { onAuthStateChanged, User } from 'firebase/auth';
import { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import SideMenu from './components/SideMenu';
import { auth } from './firebase';
import { Authorization } from './pages/Authorization';
import { Chat } from './pages/Chat';
import { Messenger } from './pages/Chat/Messenger';
import { EventPage } from './pages/Events';
import { Map } from './pages/Map';
import { AddNewEvent } from './pages/Map/router/AddNewEvent';

function App () {
    const [user, setUser] = useState<User | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setLoading] = useState<boolean>(true);

    useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
            setLoading(false);
            if (user) console.log('Зарегистрирован ', user);
            else console.log('Не зареган');
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <div className="app">
            <div className='wrapper'>
                <SideMenu />

                <div className='div1'>
                    <Routes>
                        <Route path="/" element={<Suspense><div className=''>1</div></Suspense>} />
                        <Route path="/authorization" element={<Suspense><Authorization /></Suspense>} />
                        <Route path="/chat" element={
                            user
                                ? (
                                    <Suspense><Chat /></Suspense>
                                )
                                : (
                                    <Navigate to='/authorization' />
                                )
                        } />
                        <Route path="/map" element={<Suspense><Map /></Suspense>} />
                        <Route path="/groups" element={<Suspense><div>1</div></Suspense>} />
                        <Route path="/messenger" element={<Suspense><Messenger></Messenger></Suspense>} />
                        <Route path="/event/:id" element={<Suspense><EventPage /></Suspense>} />

                        {
                            user
                                ? (
                                    <>
                                        <Route path='/profile' element={<div>Profile</div>} />
                                        <Route path='/add-event' element={<AddNewEvent />} />
                                    </>
                                )
                                : undefined
                        }
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
