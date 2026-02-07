import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { GetsDoctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

export const GetsDoctorController = catchAsync(
  async (req: Request, res: Response) => {
    const doctor = await GetsDoctorService();

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor fetch successfully",
      data: doctor,
    });
  },
);
