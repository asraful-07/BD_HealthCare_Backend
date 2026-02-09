import express from "express";
import {
  CreateSpecialtyController,
  DeleteSpecialtyController,
  GetsSpecialtyController,
} from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const specialtyRotes = express.Router();

specialtyRotes.post("/", CreateSpecialtyController);
specialtyRotes.get(
  "/",
  checkAuth(Roles.ADMIN, Roles.PATIENT),
  GetsSpecialtyController,
);
specialtyRotes.delete("/:id", DeleteSpecialtyController);

export default specialtyRotes;
