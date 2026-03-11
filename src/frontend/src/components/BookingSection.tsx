import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetAvailableServices, useSubmitBooking } from "../hooks/useQueries";

const vehicleTypes = ["Sedan", "SUV", "Truck", "Van", "Motorcycle"];

export function BookingSection() {
  const { data: services } = useGetAvailableServices();
  const submitBooking = useSubmitBooking();

  const [form, setForm] = useState({
    customerName: "",
    phoneNumber: "",
    vehicleType: "",
    serviceIndex: "",
    preferredDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.customerName ||
      !form.phoneNumber ||
      !form.vehicleType ||
      !form.serviceIndex ||
      !form.preferredDate
    ) {
      return;
    }
    submitBooking.mutate({
      customerName: form.customerName,
      phoneNumber: form.phoneNumber,
      vehicleType: form.vehicleType,
      serviceIndex: BigInt(form.serviceIndex),
      preferredDate: form.preferredDate,
    });
  };

  const handleReset = () => {
    setForm({
      customerName: "",
      phoneNumber: "",
      vehicleType: "",
      serviceIndex: "",
      preferredDate: "",
    });
    submitBooking.reset();
  };

  return (
    <section
      id="booking"
      className="py-24 section-dark relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, oklch(0.52 0.18 210) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 gradient-cyan text-white border-0 font-semibold px-4 py-1">
              Book Now
            </Badge>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight mb-4">
              Reserve Your Wash
            </h2>
            <p className="text-dark-muted font-body text-lg">
              Fill in the details below and we'll confirm your slot within the
              hour.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
          >
            <AnimatePresence mode="wait">
              {submitBooking.isSuccess ? (
                <motion.div
                  key="success"
                  data-ocid="booking.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full gradient-cyan flex items-center justify-center mx-auto mb-6 shadow-glow">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">
                    Booking Confirmed!
                  </h3>
                  <p className="text-dark-muted font-body mb-2">
                    We've received your request and will contact you shortly to
                    confirm your appointment.
                  </p>
                  <p className="text-white/40 text-sm font-body mb-8">
                    Booking ID: #{submitBooking.data?.toString()}
                  </p>
                  <Button
                    onClick={handleReset}
                    className="gradient-cyan text-white font-semibold"
                  >
                    Book Another Wash
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  data-ocid="booking.form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {submitBooking.isError && (
                    <div
                      data-ocid="booking.error_state"
                      className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-red-400 text-sm font-body"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="customerName"
                        className="text-white/90 font-body text-sm font-medium"
                      >
                        Full Name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="customerName"
                        data-ocid="booking.name_input"
                        placeholder="John Smith"
                        value={form.customerName}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            customerName: e.target.value,
                          }))
                        }
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="phoneNumber"
                        className="text-white/90 font-body text-sm font-medium"
                      >
                        Phone Number <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="phoneNumber"
                        data-ocid="booking.phone_input"
                        type="tel"
                        placeholder="(555) 000-1234"
                        value={form.phoneNumber}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            phoneNumber: e.target.value,
                          }))
                        }
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-white/90 font-body text-sm font-medium">
                        Vehicle Type <span className="text-red-400">*</span>
                      </Label>
                      <Select
                        value={form.vehicleType}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, vehicleType: v }))
                        }
                      >
                        <SelectTrigger
                          data-ocid="booking.vehicle_select"
                          className="bg-white/10 border-white/20 text-white focus:border-primary"
                        >
                          <SelectValue placeholder="Select vehicle..." />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleTypes.map((v) => (
                            <SelectItem key={v} value={v}>
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white/90 font-body text-sm font-medium">
                        Service Package <span className="text-red-400">*</span>
                      </Label>
                      <Select
                        value={form.serviceIndex}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, serviceIndex: v }))
                        }
                      >
                        <SelectTrigger
                          data-ocid="booking.service_select"
                          className="bg-white/10 border-white/20 text-white focus:border-primary"
                        >
                          <SelectValue placeholder="Select package..." />
                        </SelectTrigger>
                        <SelectContent>
                          {(services ?? []).map((s, i) => (
                            <SelectItem key={s.name} value={String(i)}>
                              {s.name} — ${s.price.toString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="preferredDate"
                      className="text-white/90 font-body text-sm font-medium"
                    >
                      Preferred Date <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                      <Input
                        id="preferredDate"
                        data-ocid="booking.date_input"
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            preferredDate: e.target.value,
                          }))
                        }
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="pl-10 bg-white/10 border-white/20 text-white focus:border-primary focus:ring-primary [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {submitBooking.isPending && (
                    <div
                      data-ocid="booking.loading_state"
                      className="flex items-center gap-2 text-white/60 text-sm font-body"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting your booking...
                    </div>
                  )}

                  <Button
                    data-ocid="booking.submit_button"
                    type="submit"
                    disabled={submitBooking.isPending}
                    className="w-full gradient-cyan text-white font-bold text-base py-6 rounded-xl shadow-glow hover:opacity-90 transition-all"
                  >
                    {submitBooking.isPending ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
