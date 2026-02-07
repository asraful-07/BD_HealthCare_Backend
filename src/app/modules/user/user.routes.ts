import express from "express";
import { CreateDoctorController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validation";

const userRoutes = express.Router();

userRoutes.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  CreateDoctorController,
);

export default userRoutes;
