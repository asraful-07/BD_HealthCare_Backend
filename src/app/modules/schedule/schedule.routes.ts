import { Router } from "express";
import {
  CreateScheduleController,
  DeleteScheduleController,
  GetScheduleController,
  GetsScheduleController,
  UpdateScheduleController,
} from "./schedule.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { ScheduleValidation } from "./schedule.validation";

const scheduleRoutes = Router();

scheduleRoutes.post(
  "/",
  validateRequest(ScheduleValidation.createScheduleZodSchema),
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  CreateScheduleController,
);
scheduleRoutes.get(
  "/",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.DOCTOR),
  GetsScheduleController,
);
scheduleRoutes.get(
  "/:id",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  GetScheduleController,
);
scheduleRoutes.patch(
  "/:id",
  validateRequest(ScheduleValidation.updateScheduleZodSchema),
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  UpdateScheduleController,
);
scheduleRoutes.delete(
  "/:id",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  DeleteScheduleController,
);

export default scheduleRoutes;
