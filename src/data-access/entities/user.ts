export interface IUser {
    user_id: number
    email: string
    password: string
    picture: string
    gender: string
    fullname: string | null
    birthday: Date | null
    created_at: Date | null
    updated_at: Date | null
}