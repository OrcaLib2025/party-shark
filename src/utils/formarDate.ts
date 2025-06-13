export const formatDate = (date: Date | string | undefined): string => {
    if (!date) return 'Дата не указана';

    const d = new Date(date);
    return d.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    });
};
