import { Taglist } from 'orcalib-ui-kit';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { formatDate } from '../../utils/formarDate';
import { IParty } from '../../utils/models/MarkerData';

import cl from './EventCard.module.scss';

interface EventProps {
    event: IParty;
}

export const EventCard: React.FC<EventProps> = ({ event }) => {
    const navigate = useNavigate();

    const membersText = `${event.membersCount}/${event.maxMembers} участников`;
    const dateText = formatDate(event.timeSlots[0]?.start);
    const isFull = event.membersCount >= event.maxMembers;

    console.log(event);

    return (
        <div className={`${cl.card} ${isFull ? cl.card_full : ''}`}>
            {!event.img
                ? (
                    <div className={cl.card__image}>
                        <img src='img/Seat.svg' alt={event.title} />
                        {event.isPaid && <span className={cl.card__badge}>Платно</span>}
                    </div>
                )
                : (
                    <div className={cl.card__image}>
                        <img src={event.img} alt={event.title} />
                        {event.isPaid && <span className={cl.card__badge}>Платно</span>}
                    </div>
                )}

            <div className={cl.card__content}>
                <div className={cl.card__header}>
                    <h3 className={cl.card__title}>{event.title}</h3>
                    <Taglist
                        tags={event.tags}
                        rotate={'horizontal'}
                        onRemove={() => { }}
                    />
                </div>
                <p className={cl.card__description}>{event.description}</p>

                <div className={cl.card__details}>
                    <div className={cl.card__detail}>
                        <span className={cl.card__icon}>📅</span> {/* НАДО ПОТОМ ЗАМЕНИТЬ, ПОКА ТАК! */}
                        {dateText}
                    </div>
                    <div className={cl.card__detail}>
                        <span className={cl.card__icon}>👥</span> {/* НАДО ПОТОМ ЗАМЕНИТЬ, ПОКА ТАК! */}
                        {membersText}
                        {isFull && <span className={cl.card__full}>Заполнено</span>}
                    </div>
                </div>

                <div className={cl.button_group}>
                    <Button
                        text={isFull ? 'Мест нет' : 'К метке!'}
                        disabled={isFull}
                        theme={'light'}
                    />
                    <Button
                        text={isFull ? 'Мест нет' : 'К ивенту'}
                        onClick={() => void navigate(`/event/${event._id}`)}
                        disabled={isFull}
                        theme={'light'}
                    />
                </div>
            </div>
        </div>
    );
};
