import React from 'react';
import { Marker } from '../../utils/models/MarkerData';

import cl from './SideMarkInfo.module.scss';

interface SideMarkInfo {
    onClose: () => void,
}

export const SideMarkInfo: React.FC<Marker & SideMarkInfo> = ({
    data,
    onClose,
}) => {
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
                <button>
                    На страницу вечеринки!
                </button>
            </div>
        </div>
    );
};
