import { useEffect, useState } from 'react';

import { TabsProps } from '../../utils/models/tabs';

import cl from './Tabs.module.scss';

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    defaultActiveTab,
    className,
    tabClassName,
    activeTabClassName,
    contentClassName,
    theme,
}) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '0px' });

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

    useEffect(() => {
        const updateIndicator = () => {
            const activeElement = document.querySelector(`.${cl.tab}.${cl.activeTab}`);
            if (activeElement) {
                const rect = activeElement.getBoundingClientRect();
                const containerRect = document.querySelector(`.${cl.tabsHeader}`)?.getBoundingClientRect();

                if (containerRect) {
                    const left = rect.left - containerRect.left;
                    const width = rect.width;

                    setIndicatorStyle({ left: `${left}px`, width: `${width}px` });
                }
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);

        return () => {
            window.removeEventListener('resize', updateIndicator);
        };
    }, [activeTab]);

    return (
        <div className={`${cl.tabsContainer} ${className || ''} ${cl[`tab-theme-${theme}`]}`}>
            <div className={cl.tabsHeader}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${cl.tab} ${tabClassName || ''} ${
                            tab.id === activeTab ? `${cl.activeTab} ${activeTabClassName || ''}` : ''
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
                <div className={cl.activeIndicator} style={indicatorStyle}></div>
            </div>

            <div className={`${cl.tabsContent} ${contentClassName || ''}`}>
                {activeTabContent}
            </div>
        </div>
    );
};
