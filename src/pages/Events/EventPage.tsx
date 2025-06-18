import React, { useEffect, useState } from 'react';
import { Spinner } from 'orcalib-ui-kit';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addMemberToParty, getPartyById } from '../../redux/actions/marker';
import { useSelector } from '../../redux/store';

import styles from './EventPage.module.scss';

export const EventPage: React.FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isJoining, setIsJoining] = useState(false);

    const { user } = useSelector((state) => state.auth);

    const {
        currentParty,
        currentPartyLoading,
        currentPartyError,
        addMemberLoading,
        addMemberError,
    } = useSelector((state) => state.marker);

    useEffect(() => {
        if (id) {
            dispatch(getPartyById(id));
        }
    }, [dispatch, id]);

    const formatDate = (date: Date | string): string => {
        const dateObj = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObj.getTime())) {
            return 'Некорректная дата';
        }
        return dateObj.toLocaleString('ru-RU', {
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

    const handleJoinParty = async () => {
        if (!id || !currentParty) return;

        setIsJoining(true);
        const currentUser = {
            name: user.username,
            id: user.uid,
        };

        await dispatch(addMemberToParty(id, currentUser));
        dispatch(getPartyById(id));
        setIsJoining(false);
    };

    const isAlreadyMember = currentParty?.members?.some(member =>
        member.id === 'user-id',
    );

    const isPartyFull = currentParty && currentParty?.membersCount >= currentParty?.maxMembers;

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
                        {currentParty.timeSlots.map((slot, index) => (
                            <div key={index} className={styles.event__slot}>
                                <span className={styles.event__slotTime}>
                                    {formatTime(new Date(slot.start))} — {formatTime(new Date(slot.end))}
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
                            currentParty.members.map((member, index) => (
                                <div key={index} className={styles.event__member}>
                                    <span className={styles.event__memberIcon}>👤</span>
                                    <span>{member.name}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className={styles.event__actions}>
                <button
                    className={`${styles.event__button} ${styles['event__button--primary']}`}
                    onClick={handleJoinParty}
                >
                    {isJoining || addMemberLoading
                        ? 'Загрузка...'
                        : isAlreadyMember
                            ? 'Вы уже участвуете'
                            : isPartyFull ? 'Мест нет' : 'Присоединиться'}
                </button>
                <button className={styles.event__button}>Показать на карте</button>

                {addMemberError && (
                    <div className={styles.event__error}>{addMemberError}</div>
                )}
            </div>
        </div>
    );
};
