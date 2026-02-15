import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { createAdminService, CreateDoctorService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

export const CreateDoctorController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const doctor = await CreateDoctorService(payload);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  },
);

export const createAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await createAdminService(payload);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Admin registered successfully",
      data: result,
    });
  },
);
