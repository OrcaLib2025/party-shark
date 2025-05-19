import React from 'react';

import { IParty } from '../../utils/models/MarkerData';

import styles from './EventPage.module.scss';

export const EventPage: React.FC = () => {
    const markersData: IParty[] = [
        {
            id: '1',
            geoPoint: [55, 73.36],
            title: 'Объект 1',
            description: 'Это подробное описание мероприятия с множеством интересных фактов и полезной информацией.',
            author: 'Иван Иванов',
            createdAt: new Date('2025-05-10T10:00:00'),
            endDate: new Date('2025-05-10T22:00:00'),
            img: '/img/Seat.svg',
            tags: ['Вечеринка', 'Пикми', 'Бомбардино Крокодило'],
            members: ['Алексей', 'Мария', 'Олег'],
            membersCount: 3,
            maxMembers: 10,
            timeSlots: [
                {
                    start: new Date('2025-05-10T10:00:00'),
                    end: new Date('2025-05-10T14:00:00'),
                },
                {
                    start: new Date('2025-05-10T16:00:00'),
                    end: new Date('2025-05-10T22:00:00'),
                },
            ],
            isActive: true,
            isPaid: false,
        },
    ];

    const event = markersData[0];

    return (
        <div className={styles.event}>
            <div className={styles['event__image-wrapper']}>
                <img src={event.img} alt={event.title} className={styles['event__image']} />
            </div>
            <div className={styles['event__content']}>
                <h1 className={styles['event__title']}>{event.title}</h1>
                <p className={styles['event__description']}>{event.description}</p>

                <div className={styles['event__meta']}>
                    <p><strong>Автор:</strong> {event.author}</p>
                    <p><strong>Дата начала:</strong> {event?.createdAt?.toLocaleString()}</p>
                    <p><strong>Дата окончания:</strong> {event.endDate?.toLocaleString()}</p>
                    <p><strong>Участники:</strong> {event.members?.join(', ')}</p>
                    <p><strong>Макс. участников:</strong> {event.maxMembers}</p>
                    <p><strong>Теги:</strong> {event.tags?.join(', ')}</p>
                    <p><strong>Статус:</strong> {event.isActive ? 'Активно' : 'Завершено'}</p>
                    <p><strong>Платное:</strong> {event.isPaid ? 'Да' : 'Нет'}</p>
                </div>

                <div className={styles['event__slots']}>
                    <h2 className={styles['event__slots-title']}>Слоты времени</h2>
                    <ul className={styles['event__slots-list']}>
                        {event.timeSlots?.map((slot, index) => (
                            <li key={index} className={styles['event__slot']}>
                                {slot.start.toLocaleTimeString()} - {slot.end.toLocaleTimeString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
