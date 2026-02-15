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
import { IQueryParams } from "../../interfaces/query.interface";

export const GetsDoctorController = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const result = await GetsDoctorService(query as IQueryParams);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor fetch successfully",
      data: result.data,
      meta: result.meta,
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
      message: "Doctor updated successfully",
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
      message: "Doctor deleted successfully",
      data: doctor,
    });
  },
);
