import { Suspense, useEffect, useState } from 'react';
import { Spinner } from 'orcalib-ui-kit';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { Notification } from './components/Notification';
import SideMenu from './components/SideMenu';
import { auth, db } from './firebase';
import { Authorization } from './pages/Authorization';
import { Chat } from './pages/Chat';
import { Messenger } from './pages/Chat/Messenger';
import { EventPage } from './pages/Events';
import { Home } from './pages/Home';
import { Map } from './pages/Map';
import { AddNewEvent } from './pages/Map/router/AddNewEvent';
import { clearUser, setUser } from './redux/actions/auth';
import { useSelector } from './redux/store';

import './App.scss';

function App () {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserData = async (uid: string) => {
        try {
            const userDoc = doc(db, 'users', uid);
            const docSnap = await getDoc(userDoc);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                dispatch(setUser({
                    uid,
                    email: userData.email,
                    username: userData.username,
                    blocked: userData.blocked || [],
                    profilePicture: userData.profilePicture || '',
                }));
            } else {
                dispatch(clearUser());
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            dispatch(clearUser());
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                localStorage.setItem('accessToken', firebaseUser.accessToken);
                await fetchUserData(firebaseUser.uid);
                setLoading(true);
            } else {
                localStorage.removeItem('accessToken');
                dispatch(clearUser());
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="app">
            <div className='wrapper'>
                <SideMenu />
                <div className='div1'>
                    <Routes>
                        <Route path="/" element={<Suspense><Home /></Suspense>} />
                        <Route path="/authorization" element={<Suspense><Authorization /></Suspense>} />
                        <Route path="/chat" element={
                            user
                                ? <Suspense><Chat /></Suspense>
                                : <Navigate to='/authorization' />
                        } />
                        <Route path="/map" element={<Suspense><Map /></Suspense>} />
                        <Route path="/groups" element={<Suspense><div>1</div></Suspense>} />
                        <Route path="/messenger" element={<Suspense><Messenger /></Suspense>} />
                        <Route path="/event/:id" element={<Suspense><EventPage /></Suspense>} />

                        {user && (
                            <>
                                <Route path='/profile' element={<div>Profile</div>} />
                                <Route path='/add-event' element={<AddNewEvent />} />
                            </>
                        )}
                    </Routes>
                    <Notification />
                </div>
            </div>
        </div>
    );
}

export default App;
