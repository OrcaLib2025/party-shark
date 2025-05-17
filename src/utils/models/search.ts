export interface SearchProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    theme: 'light' | 'dark';
    classNames?: string;
}