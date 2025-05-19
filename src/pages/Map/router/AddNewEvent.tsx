import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '../../../components/Icon';
import { IParty } from '../../../utils/models/MarkerData';
import styles from './AddNewEvent.module.scss';

export const AddNewEvent: React.FC = () => {
    const navigate = useNavigate();

    const [newEvent, setNewEvent] = useState<Partial<IParty>>({
        title: '',
        description: '',
        geoPoint: [0, 0],
        isActive: true,
        createdAt: new Date(),
        endDate: new Date(),
        timeSlots: [{ start: new Date(), end: new Date() }],
        maxMembers: 10,
        membersCount: 0,
        tags: [],
        isPaid: false,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleDateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'start' | 'end' | 'endDate',
        index?: number,
    ) => {
        const { value } = e.target;
        const date = new Date(value);

        if (index !== undefined && field !== 'endDate') {
            setNewEvent((prev) => {
                const updatedTimeSlots = [...(prev.timeSlots || [])];
                updatedTimeSlots[index] = {
                    ...updatedTimeSlots[index],
                    [field]: date,
                };
                return { ...prev, timeSlots: updatedTimeSlots };
            });
        } else {
            setNewEvent((prev) => ({ ...prev, [field]: date }));
        }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewEvent((prev) => ({
            ...prev,
            tags: value
                .split(',')
                .map((tag: string) => tag.trim())
                .filter((tag: string) => tag !== ''),
        }));
    };

    const handleAddTimeSlot = () => {
        setNewEvent((prev) => ({
            ...prev,
            timeSlots: [
                ...(prev.timeSlots || []),
                { start: new Date(), end: new Date() },
            ],
        }));
    };

    const handleSubmit = () => {
        if (!newEvent.title || !newEvent.endDate) {
            alert('Заполните обязательные поля');
            return;
        }

        console.log('New Event:', newEvent);
        alert('Мероприятие создано!');
    };

    const formatDateTimeLocal = (date: Date): string => {
        return date.toISOString().slice(0, 16);
    };

    return (
        <div className={styles['add-event-container']}>
            <div
                role="presentation"
                className={styles['leave-button']}
                onClick={() => navigate('/map')}
            >
                <Icon
                    icon="arrow-to-left-bold"
                    size='md'
                />
            </div>

            <h1>Создать новое мероприятие</h1>

            <div className={styles['event-form']}>
                <div className={styles['form-group']}>
                    <label>Название мероприятия*</label>
                    <input
                        type="text"
                        name="title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        required
                        className={styles['form-input']}
                    />
                </div>

                <div className={styles['form-group']}>
                    <label>Описание</label>
                    <textarea
                        name="description"
                        value={newEvent.description || ''}
                        onChange={handleInputChange}
                        rows={4}
                        className={styles['form-textarea']}
                    />
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Дата окончания*</label>
                        <input
                            type="datetime-local"
                            value={newEvent.endDate ? formatDateTimeLocal(newEvent.endDate) : ''}
                            onChange={(e) => handleDateChange(e, 'endDate')}
                            required
                            className={styles['form-input']}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label>Макс. участников</label>
                        <input
                            type="number"
                            name="maxMembers"
                            value={newEvent.maxMembers}
                            onChange={handleNumberChange}
                            min="1"
                            className={styles['form-input']}
                        />
                    </div>
                </div>

                <div className={styles['form-group']}>
                    <label>Теги (через запятую)</label>
                    <input
                        type="text"
                        value={newEvent.tags?.join(', ') || ''}
                        onChange={handleTagChange}
                        placeholder="музыка, танцы, вечеринка"
                        className={styles['form-input']}
                    />
                </div>

                <div className={styles['form-group']}>
                    <label>Временные слоты</label>
                    {newEvent.timeSlots?.map((slot, index) => (
                        <div key={index} className={styles['time-slot']}>
                            <input
                                type="datetime-local"
                                value={slot.start ? formatDateTimeLocal(slot.start) : ''}
                                onChange={(e) => handleDateChange(e, 'start', index)}
                                className={styles['form-input']}
                            />
                            <span className={styles['time-separator']}>до</span>
                            <input
                                type="datetime-local"
                                value={slot.end ? formatDateTimeLocal(slot.end) : ''}
                                onChange={(e) => handleDateChange(e, 'end', index)}
                                className={styles['form-input']}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className={styles['add-slot-btn']}
                        onClick={handleAddTimeSlot}
                    >
            + Добавить слот
                    </button>
                </div>

                <div className={styles['checkbox-group']}>
                    <label className={styles['checkbox-label']}>
                        <input
                            type="checkbox"
                            checked={newEvent.isPaid || false}
                            onChange={(e) =>
                                setNewEvent((prev) => ({
                                    ...prev,
                                    isPaid: e.target.checked,
                                }))
                            }
                            className={styles['checkbox-input']}
                        />
                        <span className={styles['checkbox-custom']}></span>
            Платное мероприятие
                    </label>
                </div>
            </div>

            <div className={styles['action-buttons']}>
                <button
                    onClick={handleSubmit}
                    className={styles['submit-btn']}
                    disabled={!newEvent.title}
                >
          Создать мероприятие
                </button>
                <button
                    type="button"
                    className={styles['cancel-btn']}
                    onClick={() => setNewEvent({ title: '' })}
                >
          Отмена
                </button>
            </div>
        </div>
    );
};
