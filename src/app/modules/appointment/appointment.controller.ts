import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  BookAppointmentService,
  BookAppointmentWithPayLaterService,
  ChangeAppointmentStatusService,
  GetAllAppointmentsService,
  GetMyAppointmentsService,
  GetMySingleAppointmentService,
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

export const GetMyAppointmentsController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const appointments = await GetMyAppointmentsService(user);
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Appointments retrieved successfully",
      data: appointments,
    });
  },
);

export const ChangeAppointmentStatusController = catchAsync(
  async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const payload = req.body;
    const user = req.user;

    const updatedAppointment = await ChangeAppointmentStatusService(
      appointmentId as string,
      payload,
      user,
    );
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Appointment status updated successfully",
      data: updatedAppointment,
    });
  },
);

export const GetAllAppointmentsController = catchAsync(
  async (req: Request, res: Response) => {
    const appointments = await GetAllAppointmentsService();
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "All appointments retrieved successfully",
      data: appointments,
    });
  },
);

export const GetMySingleAppointmentController = catchAsync(
  async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;

    const appointment = await GetMySingleAppointmentService(
      appointmentId as string,
      user,
    );
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Appointment retrieved successfully",
      data: appointment,
    });
  },
);
