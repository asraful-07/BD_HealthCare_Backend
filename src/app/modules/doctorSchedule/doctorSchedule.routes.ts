import { Router } from "express";

import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";
import {
  CreateDoctorScheduleController,
  DeleteDoctorScheduleController,
  GetDoctorSchedulesController,
  GetMyDoctorSchedulesController,
  GetsDoctorSchedulesController,
  UpdateDoctorScheduleController,
} from "./doctorSchedule.controller";

const doctorScheduleRoutes = Router();

doctorScheduleRoutes.post(
  "/create-doctor-schedule",
  checkAuth(Roles.DOCTOR),
  CreateDoctorScheduleController,
);
doctorScheduleRoutes.get(
  "/my-doctor-schedules",
  checkAuth(Roles.DOCTOR),
  GetMyDoctorSchedulesController,
);
doctorScheduleRoutes.get(
  "/",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  GetsDoctorSchedulesController,
);
doctorScheduleRoutes.get(
  "/:doctorId/schedule/:scheduleId",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  GetDoctorSchedulesController,
);
doctorScheduleRoutes.patch(
  "/update-doctor-schedule",
  checkAuth(Roles.DOCTOR),
  UpdateDoctorScheduleController,
);
doctorScheduleRoutes.delete(
  "/:id",
  checkAuth(Roles.DOCTOR),
  DeleteDoctorScheduleController,
);

export default doctorScheduleRoutes;
