export const serviceTypes=["Cleaning","Electrical","Plumbing","Inspection"] as const; export const urgencies=["standard","priority","emergency"] as const; export const statuses=["pending","confirmed","in-progress","completed","cancelled"] as const;
export type ServiceType=typeof serviceTypes[number]; export type Urgency=typeof urgencies[number]; export type BookingStatus=typeof statuses[number];
export interface Booking{id:string;customerName:string;email:string;phone?:string;serviceType:ServiceType;durationHours:number;urgency:Urgency;status:BookingStatus;estimate:number;assignee:string|null;notes:string;createdAt:string;metadata?:any}
export type CreateBookingInput=Pick<Booking,"customerName"|"email"|"phone"|"serviceType"|"durationHours"|"urgency"|"notes">;
