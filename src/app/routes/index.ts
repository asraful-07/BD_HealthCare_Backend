import { Router } from "express";
import specialtyRotes from "../modules/specialty/specialty.routes";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import doctorRoutes from "../modules/doctor/doctor.routes";
import adminRoutes from "../modules/admin/admin.routes";
import scheduleRoutes from "../modules/schedule/schedule.routes";
import doctorScheduleRoutes from "../modules/doctorSchedule/doctorSchedule.routes";
import appointmentRoutes from "../modules/appointment/appointment.routes";
import { PatientRoutes } from "../modules/patient/patient.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { PrescriptionRoutes } from "../modules/prescription/prescription.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";
import { statsRoutes } from "../modules/stats/stats.routes";

const router = Router();

router.use("/specialty", specialtyRotes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctor", doctorRoutes);
router.use("/admin", adminRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/doctor-schedule", doctorScheduleRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/patient", PatientRoutes);
router.use("/reviews", ReviewRoutes);
router.use("/prescription", PrescriptionRoutes);
router.use("/payment", PaymentRoutes);
router.use("/stats", statsRoutes);

export const IndexRoutes = router;
