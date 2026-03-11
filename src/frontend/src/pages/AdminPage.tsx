import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Droplets, Loader2, LogIn, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  BookingStatus,
  useAdminGetAllBookings,
  useIsCallerAdmin,
  useUpdateBookingStatus,
} from "../hooks/useQueries";
import type { BookingInquiry } from "../hooks/useQueries";

const STATUS_COLORS: Record<BookingStatus, string> = {
  [BookingStatus.pending]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [BookingStatus.confirmed]: "bg-blue-100 text-blue-800 border-blue-200",
  [BookingStatus.completed]: "bg-green-100 text-green-800 border-green-200",
  [BookingStatus.cancelled]: "bg-red-100 text-red-800 border-red-200",
};

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge
      variant="outline"
      className={`capitalize font-semibold ${STATUS_COLORS[status] ?? ""}`}
    >
      {status}
    </Badge>
  );
}

function BookingRow({
  booking,
  index,
}: { booking: BookingInquiry; index: number }) {
  const updateStatus = useUpdateBookingStatus();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus.mutateAsync({
        bookingId: booking.id,
        newStatus: newStatus as BookingStatus,
      });
      toast.success("Status updated successfully");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <TableRow data-ocid="admin.row">
      <TableCell className="font-mono text-xs text-muted-foreground">
        #{booking.id.toString()}
      </TableCell>
      <TableCell className="font-medium">{booking.customerName}</TableCell>
      <TableCell className="text-muted-foreground">
        {booking.phoneNumber}
      </TableCell>
      <TableCell>{booking.vehicleType}</TableCell>
      <TableCell>{booking.selectedService.name}</TableCell>
      <TableCell>${booking.selectedService.price.toString()}</TableCell>
      <TableCell>{booking.preferredDate}</TableCell>
      <TableCell>
        <StatusBadge status={booking.status} />
      </TableCell>
      <TableCell>
        <Select
          value={booking.status}
          onValueChange={handleStatusChange}
          disabled={updateStatus.isPending}
        >
          <SelectTrigger
            data-ocid={`admin.status_select.${index + 1}`}
            className="w-32 h-8 text-xs"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(BookingStatus).map((s) => (
              <SelectItem key={s} value={s} className="text-xs capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
}

export function AdminPage() {
  const { login, isLoggingIn, isLoginSuccess, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: bookings, isLoading: isBookingsLoading } =
    useAdminGetAllBookings();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = (bookings ?? []).filter(
    (b) =>
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.selectedService.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isInitializing || isAdminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLoginSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-2xl gradient-cyan flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-black text-3xl text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground font-body mb-8">
            Sign in to manage bookings and update statuses.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="gradient-cyan text-white font-semibold px-8 py-5 shadow-glow w-full"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4 mr-2" />
            )}
            Sign In
          </Button>
          <div className="mt-6">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to SparkleWash
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h1 className="font-display font-black text-3xl text-foreground mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground font-body mb-8">
            You don't have admin privileges to view this page.
          </p>
          <a href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10 shadow-xs">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-cyan flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-foreground">
                SparkleWash
              </span>
              <span className="text-muted-foreground font-body text-sm ml-2">
                Admin Dashboard
              </span>
            </div>
          </div>
          <a href="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Button>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total",
              value: bookings?.length ?? 0,
              color: "text-foreground",
            },
            {
              label: "Pending",
              value:
                bookings?.filter((b) => b.status === BookingStatus.pending)
                  .length ?? 0,
              color: "text-yellow-600",
            },
            {
              label: "Confirmed",
              value:
                bookings?.filter((b) => b.status === BookingStatus.confirmed)
                  .length ?? 0,
              color: "text-blue-600",
            },
            {
              label: "Completed",
              value:
                bookings?.filter((b) => b.status === BookingStatus.completed)
                  .length ?? 0,
              color: "text-green-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-4 shadow-xs"
            >
              <div className={`font-display font-black text-3xl ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm font-body">
                {stat.label} Bookings
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-display font-bold text-foreground">
              All Bookings
            </h2>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-border rounded-lg px-3 py-1.5 text-sm font-body bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-48"
            />
          </div>

          {isBookingsLoading ? (
            <div data-ocid="admin.table" className="p-6 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground font-body">
                No bookings found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-display font-bold">ID</TableHead>
                    <TableHead className="font-display font-bold">
                      Customer
                    </TableHead>
                    <TableHead className="font-display font-bold">
                      Phone
                    </TableHead>
                    <TableHead className="font-display font-bold">
                      Vehicle
                    </TableHead>
                    <TableHead className="font-display font-bold">
                      Service
                    </TableHead>
                    <TableHead className="font-display font-bold">
                      Price
                    </TableHead>
                    <TableHead className="font-display font-bold">
                      Date
                    </TableHead>
                    <TableHead className="font-display font-bold">
                      Status
                    </TableHead>
                    <TableHead className="font-display font-bold">
                      Update
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking, index) => (
                    <BookingRow
                      key={booking.id.toString()}
                      booking={booking}
                      index={index}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      <Toaster richColors />
    </div>
  );
}
