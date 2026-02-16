import { Router } from "express";
import { CreateScheduleController } from "./schedule.controller";
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

export default scheduleRoutes;
