import express from "express";
import {
  GetMeController,
  GetNewTokenController,
  PatientLoginController,
  PatientRegisterController,
} from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const authRoutes = express.Router();

authRoutes.post("/register", PatientRegisterController);
authRoutes.post("/login", PatientLoginController);
authRoutes.get(
  "/me",
  checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT),
  GetMeController,
);
authRoutes.post("/refresh-token", GetNewTokenController);

export default authRoutes;
