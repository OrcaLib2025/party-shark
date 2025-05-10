export interface ButtonGroupItemType {
    text: string;
    onClick: () => void;
    type?: 'primary' | 'secondary' | 'ghost';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    disabled?: boolean;
}

export interface ModalProps {
    onClose: (param?: boolean) => void;
    onBackgroundClick?: () => void;
    className?: string;
    isVisible: boolean;
    isClosable?: boolean;
    title: string;
    subtitle?: string | React.ReactNode;
    action?: ButtonGroupItemType[];
    buttonDirection?: 'row' | 'column';
    children?: React.ReactNode;
    backgroundImg?: string;
    theme: 'light' | 'dark';
}

export interface ButtonProps {
    text?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    onClick?: () => void;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    type?: 'primary' | 'secondary' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    theme: 'light' | 'dark';
};
