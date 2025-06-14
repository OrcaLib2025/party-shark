import avatar from '../../public/img/avatar.png';
import { MockChat } from '../utils/models/Chat';

export const mockChat: MockChat = {
    title: 'Морской клуб "Алые Паруса"',
    onlineStatus: true,
    isGroupChat: true,
    participants: [
        {
            ChatMember: {
                uid: 1,
                username: 'Антон Чехов',
                profilePicture: avatar,
                isOnline: true,
            },
        },
        {
            ChatMember: {
                uid: 2,
                username: 'Марина Цветаева',
                profilePicture: avatar,
                isOnline: false,
            },
        },
        {
            ChatMember: {
                uid: 3,
                username: 'Сергей Есенин',
                profilePicture: avatar,
                isOnline: true,
            },
        },
        {
            ChatMember: {
                uid: 4,
                username: 'Анна Ахматова',
                profilePicture: avatar,
                isOnline: false,
            },
        },
        {
            ChatMember: {
                uid: 5,
                username: 'Владимир Маяковский',
                profilePicture: avatar,
                isOnline: true,
            },
        },
    ],
};
