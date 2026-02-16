import { Router } from "express";

import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";
import {
  CreateDoctorScheduleController,
  UpdateDoctorScheduleController,
} from "./doctorSchedule.controller";

const doctorScheduleRoutes = Router();

doctorScheduleRoutes.post(
  "/create-doctor-schedule",
  checkAuth(Roles.DOCTOR),
  CreateDoctorScheduleController,
);
doctorScheduleRoutes.patch(
  "/update-doctor-schedule",
  checkAuth(Roles.DOCTOR),
  UpdateDoctorScheduleController,
);

export default doctorScheduleRoutes;
