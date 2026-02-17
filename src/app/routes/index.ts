import { Router } from "express";
import specialtyRotes from "../modules/specialty/specialty.routes";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import doctorRoutes from "../modules/doctor/doctor.routes";
import adminRoutes from "../modules/admin/admin.routes";
import scheduleRoutes from "../modules/schedule/schedule.routes";
import doctorScheduleRoutes from "../modules/doctorSchedule/doctorSchedule.routes";
import appointmentRoutes from "../modules/appointment/appointment.routes";

const router = Router();

router.use("/specialty", specialtyRotes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctor", doctorRoutes);
router.use("/admin", adminRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/doctor-schedule", doctorScheduleRoutes);
router.use("/appointment", appointmentRoutes);

export const IndexRoutes = router;
