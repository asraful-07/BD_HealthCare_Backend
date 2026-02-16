import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { BookAppointmentService } from "./appointment.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

export const BookAppointmentController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const result = await BookAppointmentService(user, payload);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Appointment booked successfully",
      data: result,
    });
  },
);
