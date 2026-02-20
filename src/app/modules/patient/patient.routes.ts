import { Router } from "express";
import { Roles } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { updateMyPatientProfileMiddleware } from "./patient.middlewares";
import { PatientValidation } from "./patient.validation";
import { UpdateMyProfileController } from "./patient.controller";

const router = Router();

router.patch(
  "/update-my-profile",
  checkAuth(Roles.PATIENT),
  multerUpload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "medicalReports", maxCount: 8 },
  ]),
  updateMyPatientProfileMiddleware,
  validateRequest(PatientValidation.updatePatientProfileZodSchema),
  UpdateMyProfileController,
);

export const PatientRoutes = router;
