import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  GetDoctorService,
  GetsDoctorService,
  SoftDeleteDoctorService,
  UpdateDoctorService,
} from "./doctor.service";
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

export const GetDoctorController = catchAsync(
  async (req: Request, res: Response) => {
    const doctor = await GetDoctorService(req.params.id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor fetch successfully",
      data: doctor,
    });
  },
);

export const UpdateDoctorController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const doctor = await UpdateDoctorService(req.params.id as string, payload);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor fetch successfully",
      data: doctor,
    });
  },
);

export const SoftDeleteDoctorController = catchAsync(
  async (req: Request, res: Response) => {
    const doctor = await SoftDeleteDoctorService(req.params.id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor fetch successfully",
      data: doctor,
    });
  },
);
