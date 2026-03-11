import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
    phoneNumber : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Car Wash Business Logic
  type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  type CarWashService = {
    name : Text;
    description : Text;
    price : Nat;
  };

  let basicService : CarWashService = {
    name = "Basic";
    description = "External wash, vacuum, and window cleaning";
    price = 20;
  };

  let standardService : CarWashService = {
    name = "Standard";
    description = "Includes Basic + interior wipe down and tire shine";
    price = 35;
  };

  let premiumService : CarWashService = {
    name = "Premium";
    description = "Full cleaning, polish, and wax";
    price = 50;
  };

  let availableServices = [basicService, standardService, premiumService];

  type BookingInquiry = {
    id : Nat;
    customerName : Text;
    phoneNumber : Text;
    vehicleType : Text;
    selectedService : CarWashService;
    preferredDate : Text;
    status : BookingStatus;
  };

  module BookingInquiry {
    public func compare(a : BookingInquiry, b : BookingInquiry) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let bookingInquiries = Map.empty<Nat, BookingInquiry>();
  var nextBookingId = 1;

  public query ({ caller }) func getAvailableServices() : async [CarWashService] {
    availableServices;
  };

  public shared ({ caller }) func submitBookingInquiry(
    customerName : Text,
    phoneNumber : Text,
    vehicleType : Text,
    serviceIndex : Nat,
    preferredDate : Text,
  ) : async Nat {
    if (serviceIndex >= availableServices.size()) {
      Runtime.trap("Invalid service selection");
    };

    let booking : BookingInquiry = {
      id = nextBookingId;
      customerName;
      phoneNumber;
      vehicleType;
      selectedService = availableServices[serviceIndex];
      preferredDate;
      status = #pending;
    };

    bookingInquiries.add(nextBookingId, booking);
    nextBookingId += 1;
    booking.id;
  };

  public query ({ caller }) func getBookingInquiry(bookingId : Nat) : async BookingInquiry {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    switch (bookingInquiries.get(bookingId)) {
      case (?booking) { booking };
      case (null) { Runtime.trap("Booking not found") };
    };
  };

  public query ({ caller }) func adminGetAllBookings() : async [BookingInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    bookingInquiries.values().toArray().sort();
  };

  public shared ({ caller }) func updateBookingStatus(bookingId : Nat, newStatus : BookingStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    switch (bookingInquiries.get(bookingId)) {
      case (?booking) {
        let updatedBooking : BookingInquiry = {
          id = booking.id;
          customerName = booking.customerName;
          phoneNumber = booking.phoneNumber;
          vehicleType = booking.vehicleType;
          selectedService = booking.selectedService;
          preferredDate = booking.preferredDate;
          status = newStatus;
        };
        bookingInquiries.add(bookingId, updatedBooking);
      };
      case (null) {
        Runtime.trap("Booking not found");
      };
    };
  };
};
