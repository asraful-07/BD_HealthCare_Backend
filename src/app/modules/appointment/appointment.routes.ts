import { Router } from "express";
import {
  BookAppointmentController,
  BookAppointmentWithPayLaterController,
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

export default appointmentRoutes;
