/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { Spinner } from 'orcalib-ui-kit';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPartyById } from '../../redux/actions/marker';
import { useSelector } from '../../redux/store';

import styles from './EventPage.module.scss';

export const EventPage: React.FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { currentParty, currentPartyLoading, currentPartyError } = useSelector(
        (state) => state.marker,
    );

    useEffect(() => {
        if (id) {
            dispatch(getPartyById(id));
        }
    }, [dispatch, id]);

    const formatDate = (date: Date): string => {
        return new Date(date).toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatTime = (date: Date): string => {
        return new Date(date).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const calculateDurationHours = (start: Date | string, end: Date | string): number => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    };

    if (currentPartyError) {
        return <h1>Ошибка загрузки мероприятия</h1>;
    }

    if (!currentParty || currentPartyLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.event}>
            <div className={styles.event__header}>
                <div className={styles.event__imageContainer}>
                    <img src={currentParty.img} alt={currentParty.title} className={styles.event__image} />
                    <div className={styles.event__badges}>
                        {currentParty.isPaid && (
                            <span className={`${styles.event__badge} ${styles['event__badge--paid']}`}>
                                Платно
                            </span>
                        )}
                        <span
                            className={`${styles.event__badge} ${styles['event__badge--status']}`}
                        >
                            {currentParty.isActive ? 'Активно' : 'Завершено'}
                        </span>
                    </div>
                </div>

                <div className={styles.event__info}>
                    <h1 className={styles.event__title}>{currentParty.title}</h1>

                    <div className={styles.event__meta}>
                        <div className={styles.event__metaItem}>
                            <span className={styles.event__metaIcon}>👤</span>
                            <span>{currentParty.author}</span>
                        </div>
                        <div className={styles.event__metaItem}>
                            <span className={styles.event__metaIcon}>📅</span>
                            <span>{formatDate(currentParty.createdAt)}</span>
                        </div>
                        <div className={styles.event__metaItem}>
                            <span className={styles.event__metaIcon}>👥</span>
                            <span>
                                {currentParty.membersCount}/{currentParty.maxMembers} участников
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.event__content}>
                <div className={styles.event__section}>
                    <h2 className={styles.event__sectionTitle}>Описание</h2>
                    <p className={styles.event__description}>{currentParty.description}</p>
                </div>

                <div className={styles.event__section}>
                    <h2 className={styles.event__sectionTitle}>Теги</h2>
                    <div className={styles.event__tags}>
                        {/* @ts-ignore */}
                        {currentParty.tags.map((tag, index) => (
                            <span key={index} className={styles.event__tag}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.event__section}>
                    <h2 className={styles.event__sectionTitle}>Временные слоты</h2>
                    <div className={styles.event__slots}>
                        {/* @ts-ignore */}
                        {currentParty.timeSlots.map((slot, index) => (
                            <div key={index} className={styles.event__slot}>
                                <span className={styles.event__slotTime}>
                                    {/* @ts-ignore */}
                                    {formatTime(slot.start)} — {formatTime(slot.end)}
                                </span>
                                <span className={styles.event__slotDuration}>
                                    {calculateDurationHours(slot.start, slot.end)} ч
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.event__section}>
                    <h2 className={styles.event__sectionTitle}>Участники</h2>
                    <div className={styles.event__members}>
                        {Array.isArray(currentParty.members) &&
                            // @ts-ignore
                            currentParty.members.map((member, index) => (
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
                <button className={styles.event__button}>Показать на карте</button>
            </div>
        </div>
    );
};
