class InternalException extends Error {
    status: number;
    message: string;

    constructor(message: string) {
        super(message);
        this.status = 500;
        this.message = message;
    }
}

export default InternalException;