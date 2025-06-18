import { useEffect } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

import { Spinner } from '../../components/Spinner';
import { EventCard } from '../../features/EventCard';
import { getAllParties } from '../../redux/actions/marker';
import { useSelector } from '../../redux/store';
import { ErrorPage } from '../Error';

import cl from './Home.module.scss';

export const Home = () => {
    const dispatch = useDispatch();

    const { allParties, getAllLoading, getAllError } = useSelector((state) => state.marker);

    useEffect(() => {
        dispatch(getAllParties());
    }, [dispatch]);

    if (getAllError) return <ErrorPage />;
    if (getAllLoading) return <Spinner />;

    return (
        <div className={cl.home}>
            <div className={cl.home__grid}>
                {allParties.map((item) => (
                    <div
                        key={item._id}
                        className={classnames(cl.home__item, cl[''])}
                    >
                        <EventCard event={item}/>
                    </div>
                ))}
            </div>
        </div>
    );
};
