import classnames from 'classnames';
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

    const membersText = `${event.members?.length || event.membersCount}/${event.maxMembers} участников`;
    const dateText = formatDate(event.timeSlots[0]?.start);
    const isFull = event.membersCount >= event.maxMembers;

    return (
        <div className={classnames(cl.card)}>
            {!event.img &&
                (
                    <div
                        className={classnames(
                            cl.card__image,
                        )}
                    >
                        {
                            !event.img
                                ? (
                                    <img src='img/Seat.svg' alt={event.title} />
                                )
                                : (
                                    <img src={event.img} alt={event.title} />
                                )
                        }
                        <div className={cl['card__info']}>
                            {isFull && <span className={cl['card__members-full']}>Заполненно</span>}
                            {event.isPaid && <span className={cl.card__badge}>Платно</span>}
                        </div>
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
