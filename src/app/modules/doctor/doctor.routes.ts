import { Router } from "express";
import { GetsDoctorController } from "./doctor.controller";

const doctorRoutes = Router();

doctorRoutes.get("/", GetsDoctorController);

export default doctorRoutes;
