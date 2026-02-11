import express from "express";
import {
  ChangePasswordController,
  forgetPasswordController,
  GetMeController,
  GetNewTokenController,
  googleLoginController,
  googleLoginSuccessController,
  handleOAuthErrorController,
  logoutUserController,
  PatientLoginController,
  PatientRegisterController,
  restPasswordController,
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
authRoutes.post("/forget-password", forgetPasswordController);
authRoutes.post("/reset-password", restPasswordController);

authRoutes.get("/login/google", googleLoginController);
authRoutes.get("/google/success", googleLoginSuccessController);
authRoutes.get("/oauth/error", handleOAuthErrorController);

export default authRoutes;
