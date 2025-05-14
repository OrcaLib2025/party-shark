export interface InputProps {
    onFocus?: () => void;
    clearable?: boolean;
    type?: 'text' | 'password' | 'email' | 'number' | 'range';
    min?: number;
    max?: number;
    label?: string | React.ReactNode;
    placeholder?: string;
    value: string | number | readonly string[] | undefined
    onChange: (value: string) => void;
    size?: 'default' | 'large';
    theme: 'light' | 'dark';
    classNames?: string;
}