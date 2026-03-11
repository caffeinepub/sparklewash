import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingInquiry {
    id: bigint;
    customerName: string;
    status: BookingStatus;
    vehicleType: string;
    selectedService: CarWashService;
    preferredDate: string;
    phoneNumber: string;
}
export interface CarWashService {
    name: string;
    description: string;
    price: bigint;
}
export interface UserProfile {
    name: string;
    phoneNumber: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminGetAllBookings(): Promise<Array<BookingInquiry>>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAvailableServices(): Promise<Array<CarWashService>>;
    getBookingInquiry(bookingId: bigint): Promise<BookingInquiry>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBookingInquiry(customerName: string, phoneNumber: string, vehicleType: string, serviceIndex: bigint, preferredDate: string): Promise<bigint>;
    updateBookingStatus(bookingId: bigint, newStatus: BookingStatus): Promise<void>;
}
