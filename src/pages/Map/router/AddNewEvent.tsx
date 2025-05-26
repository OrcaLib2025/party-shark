import { useEffect, useState } from 'react';
import { addHours } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Icon } from '../../../components/Icon';
import { createParty, resetCreatedParty } from '../../../redux/actions/marker';
import { useSelector } from '../../../redux/store';
import { IParty } from '../../../utils/models/MarkerData';

import styles from './AddNewEvent.module.scss';

type LocalParty = Omit<IParty, 'createdAt' | 'membersCount'> & {
  endDate: Date;
  timeSlots: { start: Date; end: Date }[];
};

export const AddNewEvent: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { createLoading, createError, createdParty } = useSelector((state) => state.marker);

    const omskTimeZone = 'Asia/Omsk';

    const initialEndDate = new Date();
    const initialStart = new Date();
    const initialEnd = addHours(initialStart, 1);
    const geo = localStorage.getItem('geoCord')?.split(',').map(Number) || [0, 0];

    const [newEvent, setNewEvent] = useState<LocalParty>({
        uid: user.uid,
        title: '',
        description: '',
        geoPoint: [geo[0], geo[1]],
        isActive: true,
        endDate: initialEndDate,
        timeSlots: [{ start: initialStart, end: initialEnd }],
        maxMembers: 10,
        tags: [],
        isPaid: false,
    });
    const [timeSlotErrors, setTimeSlotErrors] = useState<string[]>([]);
    const [endDateError, setEndDateError] = useState<string>('');

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
        const date = toZonedTime(value, omskTimeZone);

        if (index !== undefined && field !== 'endDate') {
            setNewEvent((prev) => {
                const updatedTimeSlots = [...prev.timeSlots];
                updatedTimeSlots[index] = {
                    ...updatedTimeSlots[index],
                    [field]: date,
                };

                const errors = [...timeSlotErrors];
                if (updatedTimeSlots[index].start >= updatedTimeSlots[index].end) {
                    errors[index] = 'Время начала должно быть раньше времени окончания';
                } else {
                    errors[index] = '';
                }
                setTimeSlotErrors(errors);

                return { ...prev, timeSlots: updatedTimeSlots };
            });
        } else {
            setNewEvent((prev) => {
                const newState = { ...prev, [field]: date };
                const now = new Date();
                if (date < now) {
                    setEndDateError('Дата окончания не может быть в прошлом');
                } else {
                    setEndDateError('');
                }
                return newState;
            });
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
        const newStart = new Date();
        const newEnd = addHours(newStart, 1);
        setNewEvent((prev) => ({
            ...prev,
            timeSlots: [...prev.timeSlots, { start: newStart, end: newEnd }],
        }));
        setTimeSlotErrors((prev) => [...prev, '']);
    };

    const handleSubmit = () => {
        if (!newEvent.title) {
            toast.error('Заполните название мероприятия');
            return;
        }

        const now = new Date();
        if (newEvent.endDate < now) {
            toast.error('Дата окончания не может быть в прошлом');
            return;
        }

        const invalidTimeSlots = newEvent.timeSlots.some(
            (slot) => slot.start >= slot.end,
        );
        if (invalidTimeSlots) {
            toast.error('Все временные слоты должны иметь время начала раньше времени окончания');
            return;
        }

        const serializedEvent: Omit<IParty, 'createdAt' | 'membersCount'> = {
            ...newEvent,
            endDate: newEvent.endDate.toISOString(),
            timeSlots: newEvent.timeSlots.map(slot => ({
                start: slot.start.toString(),
                end: slot.end.toString(),
            })),
        };

        dispatch(createParty(serializedEvent));
    };

    useEffect(() => {
        if (createdParty) {
            toast.success('Мероприятие создано!');
            const newStart = new Date();
            const newEnd = addHours(newStart, 1);
            setNewEvent({
                title: '',
                description: '',
                geoPoint: [0, 0],
                isActive: true,
                endDate: new Date(),
                timeSlots: [{ start: newStart, end: newEnd }],
                maxMembers: 10,
                tags: [],
                isPaid: false,
            });
            setTimeSlotErrors(['']);
            setEndDateError('');

            dispatch(resetCreatedParty());
            navigate('/map');
        }
        if (createError) {
            toast.error(`Ошибка: ${createError}`);
        }
    }, [createdParty, createError, navigate]);

    const formatDateTimeLocal = (date: Date | string): string => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return formatInTimeZone(dateObj, omskTimeZone, "yyyy-MM-dd'T'HH:mm");
    };

    const getMinDateTime = () => {
        return formatInTimeZone(new Date(), omskTimeZone, "yyyy-MM-dd'T'HH:mm");
    };

    return (
        <div className={styles['add-event-container']}>
            <div
                role="presentation"
                className={styles['leave-button']}
                onClick={() => navigate('/map')}
            >
                <Icon icon="arrow-to-left-bold" size="md" />
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
                        disabled={createLoading}
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
                        disabled={createLoading}
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
                            min={getMinDateTime()}
                            className={styles['form-input']}
                            disabled={createLoading}
                        />
                        {endDateError && (
                            <div className={styles['error-message']}>{endDateError}</div>
                        )}
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
                            disabled={createLoading}
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
                        disabled={createLoading}
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
                                min={getMinDateTime()}
                                className={styles['form-input']}
                                disabled={createLoading}
                            />
                            <span className={styles['time-separator']}>до</span>
                            <input
                                type="datetime-local"
                                value={slot.end ? formatDateTimeLocal(slot.end) : ''}
                                onChange={(e) => handleDateChange(e, 'end', index)}
                                min={getMinDateTime()}
                                className={styles['form-input']}
                                disabled={createLoading}
                            />
                            {timeSlotErrors[index] && (
                                <div className={styles['error-message']}>
                                    {timeSlotErrors[index]}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        className={styles['add-slot-btn']}
                        onClick={handleAddTimeSlot}
                        disabled={createLoading}
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
                            disabled={createLoading}
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
                    disabled={createLoading || !newEvent.title || timeSlotErrors.some((e) => e) || !!endDateError}
                >
                    {createLoading ? 'Создание...' : 'Создать мероприятие'}
                </button>
                <button
                    type="button"
                    className={styles['cancel-btn']}
                    onClick={() => {
                        const newStart = new Date();
                        const newEnd = addHours(newStart, 1);
                        setNewEvent({
                            title: '',
                            description: '',
                            geoPoint: [0, 0],
                            isActive: true,
                            endDate: new Date(),
                            timeSlots: [{ start: newStart, end: newEnd }],
                            maxMembers: 10,
                            tags: [],
                            isPaid: false,
                        });
                        setTimeSlotErrors(['']);
                        setEndDateError('');
                    }}
                    disabled={createLoading}
                >
                    Отмена
                </button>
            </div>
        </div>
    );
};
