import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import {
  CreateDoctorScheduleService,
  UpdateDoctorScheduleService,
} from "./doctorSchedule.service";
import status from "http-status";

export const CreateDoctorScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const schedule = await CreateDoctorScheduleService(user, payload);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Created doctor schedule successfully",
      data: schedule,
    });
  },
);

export const UpdateDoctorScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const schedule = await UpdateDoctorScheduleService(user, payload);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Updated doctor schedule successfully",
      data: schedule,
    });
  },
);
