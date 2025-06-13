/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import { IParty } from '../../utils/models/MarkerData';

import styles from './EventPage.module.scss';

export const EventPage: React.FC = () => {
    const markersData: IParty[] = [
        {
            _id: '1',
            geoPoint: [55, 73.36],
            title: 'Фестиваль уличной еды и музыки',
            description: 'Грандиозный гастрономический фестиваль под открытым небом с участием лучших фуд-траков города, живой музыкой и мастер-классами от шеф-поваров. В программе: кулинарные баттлы, дегустации и развлечения для всей семьи.',
            author: 'Иван Иванов',
            createdAt: new Date('2025-05-10T10:00:00'),
            endDate: new Date('2025-05-10T22:00:00'),
            img: '/img/food-festival.jpg',
            tags: ['Гастрономия', 'Музыка', 'Фестиваль', 'Семейный'],
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
            isPaid: true,
        },
    ];

    const event = markersData[0];
    const formatDate = (date: Date) => date.toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={styles.event}>
            <div className={styles.event__header}>
                <div className={styles.event__imageContainer}>
                    <img src={event.img} alt={event.title} className={styles.event__image} />
                    <div className={styles.event__badges}>
                        {event.isPaid && <span className={`${styles.event__badge} ${styles['event__badge--paid']}`}>Платно</span>}
                        <span className={`${styles.event__badge} ${styles['event__badge--status']}`}>
                            {event.isActive ? 'Активно' : 'Завершено'}
                        </span>
                    </div>
                </div>

                <div className={styles.event__info}>
                    <h1 className={styles.event__title}>{event.title}</h1>

                    <div className={styles.event__meta}>
                        <div className={styles.event__metaItem}>
                            <span className={styles.event__metaIcon}>👤</span>
                            <span>{event.author}</span>
                        </div>
                        <div className={styles.event__metaItem}>
                            <span className={styles.event__metaIcon}>📅</span>
                            <span>{formatDate(event.createdAt)}</span>
                        </div>
                        <div className={styles.event__metaItem}>
                            <span className={styles.event__metaIcon}>👥</span>
                            <span>{event.membersCount}/{event.maxMembers} участников</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.event__content}>
                <div className={styles.event__section}>
                    <h2 className={styles.event__sectionTitle}>Описание</h2>
                    <p className={styles.event__description}>{event.description}</p>
                </div>

                <div className={styles.event__section}>
                    <h2 className={styles.event__sectionTitle}>Теги</h2>
                    <div className={styles.event__tags}>
                        {event.tags.map((tag, index) => (
                            <span key={index} className={styles.event__tag}>#{tag}</span>
                        ))}
                    </div>
                </div>

                <div className={styles.event__section}>
                    <h2 className={styles.event__sectionTitle}>Временные слоты</h2>
                    <div className={styles.event__slots}>
                        {event.timeSlots.map((slot, index) => (
                            <div key={index} className={styles.event__slot}>
                                <span className={styles.event__slotTime}>
                                    {slot.start.toLocaleString([], { hour: '2-digit', minute: '2-digit' })} - {slot.end.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className={styles.event__slotDuration}>
                                    {/* @ts-expect-error */}
                                    {Math.floor((slot.end.getTime() - slot.start.getTime()) / (1000 * 60 * 60))} ч
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.event__section}>
                    <h2 className={styles.event__sectionTitle}>Участники</h2>
                    <div className={styles.event__members}>
                        {event.members && event.members.map((member, index) => (
                            <div key={index} className={styles.event__member}>
                                <span className={styles.event__memberIcon}>👤</span>
                                <span>{member}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.event__actions}>
                <button className={`${styles.event__button} ${styles['event__button--primary']}`}>
                    Присоединиться
                </button>
                <button className={styles.event__button}>
                    Показать на карте
                </button>
            </div>
        </div>
    );
};
