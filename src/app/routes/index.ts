import { Router } from "express";
import specialtyRotes from "../modules/specialty/specialty.routes";

const router = Router();

router.use("/specialty", specialtyRotes);

export const IndexRoutes = router;
