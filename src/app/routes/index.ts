import { Router } from "express";
import specialtyRotes from "../modules/specialty/specialty.routes";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import doctorRoutes from "../modules/doctor/doctor.routes";

const router = Router();

router.use("/specialty", specialtyRotes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctor", doctorRoutes);

export const IndexRoutes = router;
