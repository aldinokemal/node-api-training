export interface IRegisterRequest {
    email: string,
    password: string,
    gender: string,
    fullname: string,
}

export interface IRegisterResponse {
    message: string,
}