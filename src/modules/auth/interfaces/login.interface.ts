export interface ILoginRequest {
    email: string,
    password: string
}

export interface ILoginResponse {
    full_name: string | null
    email: string | null
    token: string | null
    secret: string | null
}