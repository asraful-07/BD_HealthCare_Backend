import { Router } from "express";
import {
  BookAppointmentController,
  BookAppointmentWithPayLaterController,
  ChangeAppointmentStatusController,
  GetAllAppointmentsController,
  GetMyAppointmentsController,
  GetMySingleAppointmentController,
  InitiatePaymentController,
} from "./appointment.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const appointmentRoutes = Router();

appointmentRoutes.post(
  "/book",
  checkAuth(Roles.PATIENT),
  BookAppointmentController,
);
appointmentRoutes.post(
  "/book-appointment-with-pay-later",
  checkAuth(Roles.PATIENT),
  BookAppointmentWithPayLaterController,
);
appointmentRoutes.post(
  "/initiate-payment/:id",
  checkAuth(Roles.PATIENT),
  InitiatePaymentController,
);
appointmentRoutes.get(
  "/book-appointment",
  checkAuth(Roles.PATIENT, Roles.DOCTOR),
  GetMyAppointmentsController,
);
appointmentRoutes.patch(
  "/change-appointment-status/:id",
  checkAuth(Roles.PATIENT, Roles.DOCTOR, Roles.ADMIN, Roles.SUPER_ADMIN),
  ChangeAppointmentStatusController,
);
appointmentRoutes.get(
  "/all-appointments",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  GetAllAppointmentsController,
);
appointmentRoutes.get(
  "/my-single-appointment/:id",
  checkAuth(Roles.PATIENT, Roles.DOCTOR),
  GetMySingleAppointmentController,
);

export default appointmentRoutes;

// router.post("/book-appointment", checkAuth(Role.PATIENT), AppointmentController.bookAppointment);
// router.get("/my-appointments", checkAuth(Role.PATIENT, Role.DOCTOR), AppointmentController.getMyAppointments);
// router.patch("/change-appointment-status/:id", checkAuth(Role.PATIENT, Role.DOCTOR, Role.ADMIN, Role.SUPER_ADMIN),AppointmentController.changeAppointmentStatus);
// router.get("/my-single-appointment/:id", checkAuth(Role.PATIENT, Role.DOCTOR), AppointmentController.getMySingleAppointment);
// router.get("/all-appointments", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AppointmentController.getAllAppointments);
// router.post("/book-appointment-with-pay-later", checkAuth(Role.PATIENT), AppointmentController.bookAppointmentWithPayLater);
// router.post("/initiate-payment/:id", checkAuth(Role.PATIENT), AppointmentController.initiatePayment);
