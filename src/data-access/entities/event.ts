export interface IEvent {
    event_id: bigint
    event_uuid: string | null
    event_name: string | null
    event_picture: string
    event_desc: string | null
    event_start: Date | null
    event_end: Date | null
    created_at: Date | null
    updated_at: Date | null
}