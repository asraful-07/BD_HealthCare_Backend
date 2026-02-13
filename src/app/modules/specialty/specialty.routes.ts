import express from "express";
import {
  CreateSpecialtyController,
  DeleteSpecialtyController,
  GetsSpecialtyController,
} from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { SpecialtyValidation } from "./specialty.validation";

const specialtyRotes = express.Router();

specialtyRotes.post(
  "/",
  multerUpload.single("file"),
  validateRequest(SpecialtyValidation.createSpecialtyZodSchema),
  CreateSpecialtyController,
);
specialtyRotes.get(
  "/",
  checkAuth(Roles.ADMIN, Roles.PATIENT),
  GetsSpecialtyController,
);
specialtyRotes.delete("/:id", DeleteSpecialtyController);

export default specialtyRotes;
