import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import { ClassDictionary } from 'classnames/types';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
    const classes: ClassDictionary = { input: true };
    if (className) classes[className] = true;
    if (error) classes['is-danger'] = true;

    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input {...props} className={cn(classes)} />
            </div>
            {error && <p className="help is-danger">{error}</p>}
        </div>
    );
};
export default Input;
