import classnames from 'classnames';
import React from 'react';

import cl from './Balloon.module.scss';

interface BalloonProps {
    title: string;
    description: string;
    photo?: string;
    onClick: () => void;
}

export const Balloon: React.FC<BalloonProps> = ({
    title,
    description,
    photo,
    onClick,
}) => {
    console.log(onClick);
    return (
        <div className={classnames(cl['balloon__container'])}>
            {
                photo
                    ? (
                        <img src={photo} width={120} height={120}/>
                    )
                    : undefined
            }
            <h3>
                {title}
            </h3>
            <span>
                {description}
            </span>
            <button onClick={onClick}>
                Открыть описание
            </button>
        </div>
    );
};
