import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookingStatus } from "../backend.d";
import type { BookingInquiry, CarWashService } from "../backend.d";
import { useActor } from "./useActor";

export type { CarWashService, BookingInquiry };
export { BookingStatus };

export function useGetAvailableServices() {
  const { actor, isFetching } = useActor();
  return useQuery<CarWashService[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminGetAllBookings() {
  const { actor, isFetching } = useActor();
  return useQuery<BookingInquiry[]>({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminGetAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      customerName: string;
      phoneNumber: string;
      vehicleType: string;
      serviceIndex: bigint;
      preferredDate: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBookingInquiry(
        params.customerName,
        params.phoneNumber,
        params.vehicleType,
        params.serviceIndex,
        params.preferredDate,
      );
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      bookingId: bigint;
      newStatus: BookingStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateBookingStatus(params.bookingId, params.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
  });
}
