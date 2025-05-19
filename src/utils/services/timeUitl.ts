import { Timestamp } from 'firebase/firestore';

export const formatTime = (date: Date | Timestamp): string => {
    // Если пришел Timestamp из Firebase
    const jsDate = date instanceof Timestamp ? date.toDate() : date;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Проверяем, когда было сообщение
    if (jsDate >= today) {
    // Сегодня → только время
        return jsDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (jsDate >= yesterday) {
    // Вчера → "Вчера, HH:MM"
        return `Вчера, ${jsDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (jsDate.getFullYear() === now.getFullYear()) {
    // В этом году → "День Месяца"
        return jsDate.toLocaleDateString([], { day: 'numeric', month: 'long' });
    } else {
    // Ранее → "ДД.ММ.ГГГГ"
        return jsDate.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
};

// Примеры использования:
// const timestamp = new Timestamp(1710000000, 0); // Firebase Timestamp
// formatTime(timestamp); → "Вчера, 18:00" (зависит от текущей даты)
