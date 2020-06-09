import join from 'lodash/join';
import merge from 'lodash/merge';

interface ApiError {
    status: string;
    messages: string[];
}

class HttpError extends Error {
    public readonly status: number;

    constructor(status: number, messages: string[]) {
        super(join(messages, ', '));

        this.status = status;

        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

class Api {
    constructor(readonly baseUrl: string) {}

    private async makeRequest<T>(path: string, requestOpts: RequestInit): Promise<T> {
        const defaults: RequestInit = { headers: { 'Content-Type': 'application/json' } };
        const opts = merge({}, requestOpts, defaults);

        const res = await fetch(this.baseUrl + path, opts);

        try {
            const json: T | ApiError = await res.json();

            if (res.status >= 400) throw new HttpError(res.status, (json as ApiError).messages);
            return json as T;
        } catch (err) {
            console.log(err.message);

            if (err instanceof HttpError) throw err;
            else throw new Error('There was an issue parsing the response!');
        }
    }

    public async get<T>(path: string, requestOpts: RequestInit): Promise<T> {
        const defaults: RequestInit = { method: 'GET' };
        const opts = merge({}, defaults, requestOpts);

        return await this.makeRequest<T>(path, opts);
    }

    public async post<T>(path: string, requestOpts: RequestInit): Promise<T> {
        const defaults: RequestInit = { method: 'POST' };
        const opts = merge({}, defaults, requestOpts);

        return await this.makeRequest<T>(path, opts);
    }
}

const api = new Api('http://localhost:8080');
export default api;
