import { Router } from "express";
import { BookAppointmentController } from "./appointment.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const appointmentRoutes = Router();
appointmentRoutes.post(
  "/book",
  checkAuth(Roles.PATIENT),
  BookAppointmentController,
);

export default appointmentRoutes;
