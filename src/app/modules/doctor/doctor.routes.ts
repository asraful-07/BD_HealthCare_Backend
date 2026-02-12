import { Router } from "express";
import {
  GetDoctorController,
  GetsDoctorController,
  SoftDeleteDoctorController,
  UpdateDoctorController,
} from "./doctor.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";

const doctorRoutes = Router();

doctorRoutes.get("/", GetsDoctorController);
doctorRoutes.get("/:id", GetDoctorController);
doctorRoutes.put(
  "/:id",
  validateRequest(updateDoctorZodSchema),
  UpdateDoctorController,
);
doctorRoutes.delete("/:id", SoftDeleteDoctorController);

export default doctorRoutes;
