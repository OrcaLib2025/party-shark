import { useEffect, useRef } from 'react';

import { mockMessages } from '../../mock/message';
import { Message } from '../Message';

import styles from './MessageList.module.scss';

export const MessageList = () => {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [mockMessages]);

    return (
        <div className={styles.list} ref={chatContainerRef}>
            {mockMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
};
