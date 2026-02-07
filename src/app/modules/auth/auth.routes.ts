import express from "express";
import {
  PatientLoginController,
  PatientRegisterController,
} from "./auth.controller";

const authRoutes = express.Router();

authRoutes.post("/register", PatientRegisterController);
authRoutes.post("/login", PatientLoginController);

export default authRoutes;
