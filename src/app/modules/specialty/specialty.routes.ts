import express from "express";
import {
  CreateSpecialtyController,
  DeleteSpecialtyController,
  GetsSpecialtyController,
} from "./specialty.controller";

const specialtyRotes = express.Router();

specialtyRotes.post("/", CreateSpecialtyController);
specialtyRotes.get("/", GetsSpecialtyController);
specialtyRotes.delete("/:id", DeleteSpecialtyController);

export default specialtyRotes;
