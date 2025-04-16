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
    console.log('12314');
    return (
        <div className={cl['marker-info']}>
            <button
                className={cl['close-btn']}
                onClick={onClose}
            >X</button>
            <h2>{data.title}</h2>
            <span>
                Организатор:
                {data.author}
            </span>
            <span>
                Начало:
                {data.date}
            </span>
        </div>
    );
};
