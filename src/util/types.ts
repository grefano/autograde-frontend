export interface ISubmission {
    lang: string,
    code: string,
    owner_token: string,
    owner_name: string,
    view_state?: 'pending' | 'ignored' | 'seen',
    created: number
}