import express from "express";
import {
  ChangePasswordController,
  GetMeController,
  GetNewTokenController,
  logoutUserController,
  PatientLoginController,
  PatientRegisterController,
  verifyEmailController,
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
authRoutes.post(
  "/change-password",
  checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT),
  ChangePasswordController,
);
authRoutes.post(
  "/logout",
  checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT),
  logoutUserController,
);
authRoutes.post("/verify-email", verifyEmailController);

export default authRoutes;
