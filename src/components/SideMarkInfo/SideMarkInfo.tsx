import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Marker } from '../../utils/models/MarkerData';

import cl from './SideMarkInfo.module.scss';

interface SideMarkInfo {
    onClose: () => void,
}

export const SideMarkInfo: React.FC<Marker & SideMarkInfo> = ({
    data,
    onClose,
}) => {
    const navigate = useNavigate();

    return (
        <div className={cl['marker-info']}>
            <button
                className={cl['close-btn']}
                onClick={onClose}
            >
                X
            </button>
            <div className={cl['marker-info__body']}>
                <img
                    src='img/Seat.svg'
                    className={cl['marker-info__img']}
                />
                <h2>{data.title}</h2>
                <div className={cl['marker-info__date']}>
                    {data.description}
                </div>
                <span>
                    Организатор:
                    {' '}
                    {data.author}
                </span>
                <button
                    onClick={() => void navigate(`/event/${data.id}`)}
                >
                    На страницу вечеринки!
                </button>
            </div>
        </div>
    );
};
