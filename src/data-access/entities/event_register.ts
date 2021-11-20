export interface IEventRegister {
    evreg_id: bigint
    evreg_user_id: bigint
    evreg_event_id: bigint
    evreg_lat: string | null
    evreg_lng: string | null
    created_at: Date | null
    updated_at: Date | null
}