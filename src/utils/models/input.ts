export interface InputProps {
    onFocus?: () => void;
    clearable?: boolean;
    type?: 'text' | 'password' | 'email' | 'number' | 'range';
    min?: number;
    max?: number;
    label?: string;
    placeholder?: string;
    value: string | number | readonly string[] | undefined
    onChange: (value: string) => void;
    size?: 'default' | 'large';
    theme: 'light' | 'dark';
}