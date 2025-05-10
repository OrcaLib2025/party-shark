import React from 'react';

export interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

export interface TabsProps {
    tabs: Tab[];
    defaultActiveTab?: string;
    className?: string;
    tabClassName?: string;
    activeTabClassName?: string;
    contentClassName?: string;
    theme: 'light' | 'dark';
}