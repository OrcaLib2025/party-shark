import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '../../components/Spinner';
import { EventCard } from '../../features/EventCard';
import { getAllParties } from '../../redux/actions/marker';
import { useSelector } from '../../redux/store';

import cl from './Home.module.scss';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allParties, getAllLoading, getAllError } = useSelector((state) => state.marker);

    useEffect(() => {
        dispatch(getAllParties());
    }, [dispatch]);

    if (getAllError) return navigate('/error');
    if (getAllLoading) return <Spinner />;

    return (
        <div className={cl.home}>
            <div className={cl.home__grid}>
                {allParties.map((item) => (
                    <div
                        key={item._id}
                        className={cl.home__item}
                    >
                        <EventCard event={item}/>
                    </div>
                ))}
            </div>
        </div>
    );
};
