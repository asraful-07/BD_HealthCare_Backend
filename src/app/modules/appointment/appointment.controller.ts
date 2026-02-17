import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  BookAppointmentService,
  BookAppointmentWithPayLaterService,
  InitiatePaymentService,
} from "./appointment.service";
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

export const BookAppointmentWithPayLaterController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const appointment = await BookAppointmentWithPayLaterService(payload, user);
    sendResponse(res, {
      success: true,
      httpStatusCode: status.CREATED,
      message: "Appointment booked successfully with Pay Later option",
      data: appointment,
    });
  },
);

export const InitiatePaymentController = catchAsync(
  async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;
    const paymentInfo = await InitiatePaymentService(
      appointmentId as string,
      user,
    );

    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Payment initiated successfully",
      data: paymentInfo,
    });
  },
);
