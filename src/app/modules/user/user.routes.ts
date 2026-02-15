import express from "express";
import {
  createAdminController,
  CreateDoctorController,
} from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createAdminZodSchema, createDoctorZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const userRoutes = express.Router();

userRoutes.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  CreateDoctorController,
);
userRoutes.post(
  "/create-admin",
  validateRequest(createAdminZodSchema),
  checkAuth(Roles.SUPER_ADMIN),
  createAdminController,
);

export default userRoutes;
