import { Modal } from 'orcalib-ui-kit';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import cl from './Authorization.module.scss';

export const Authorization: React.FC = () => {
    const navigate = useNavigate();

    const [isLog, setIsLog] = useState(true);

    const handleCloseAuth = () => {
        void navigate('/');
    }

    return (
        <div className={cl['authoriz']}>
            <Modal
                onClose={() => handleCloseAuth()}
                isVisible={true}
                title={isLog ? 'Log in' : 'Registration'}
            >
                <span
                    role="presentation"
                    onClick={() => setIsLog(!isLog)}
                >
                    {isLog ? 'Log in' : 'Registration'}
                </span>
            </Modal>
        </div>
    )
};