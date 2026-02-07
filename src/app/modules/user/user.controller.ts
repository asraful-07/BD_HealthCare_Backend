import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { CreateDoctorService } from "./user.service";
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
