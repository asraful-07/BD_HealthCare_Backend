import { Router } from "express";
import {
  GetAdminController,
  GetsAdminController,
  SoftDeleteAdminController,
  UpdateAdminController,
} from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updateAdminZodSchema } from "./admin.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const adminRoutes = Router();

adminRoutes.get(
  "/",
  checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN),
  GetsAdminController,
);
adminRoutes.get(
  "/:id",
  checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN),
  GetAdminController,
);
adminRoutes.patch(
  "/:id",
  validateRequest(updateAdminZodSchema),
  checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN),
  UpdateAdminController,
);
adminRoutes.delete(
  "/:id",
  checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN),
  SoftDeleteAdminController,
);

export default adminRoutes;
