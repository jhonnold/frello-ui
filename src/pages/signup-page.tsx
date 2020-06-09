import React, { useState, ChangeEvent, Dispatch, SetStateAction, FormEvent } from 'react';
import Input from '../components/input';
import api from '../util/api';

interface Token {
    token: string;
}

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<Error | null>(null);

    const changeFor = (setState: Dispatch<SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>): void => {
        setState(e.target.value);
    };

    const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const { token } = await api.post<Token>('/auth/login', { body: JSON.stringify({ username, password }) });
            console.log(token);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={submit}>
                {error && (
                    <div className="notification is-danger">
                        <button className="delete" onClick={(): void => setError(null)}></button>
                        {error.message}
                    </div>
                )}
                <Input label="Username" value={username} onChange={changeFor(setUsername)} required />
                <Input label="Password" value={password} onChange={changeFor(setPassword)} type="password" required />
                <div className="control">
                    <button className="button is-primary" disabled={!username || !password}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
