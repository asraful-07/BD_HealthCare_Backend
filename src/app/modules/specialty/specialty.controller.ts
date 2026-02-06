import { Request, Response } from "express";
import {
  CreateSpecialtyService,
  DeleteSpecialtyService,
  GetsSpecialtyService,
} from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

export const CreateSpecialtyController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const specialty = await CreateSpecialtyService(payload);
    sendResponse(res, {
      httpStatusCode: 201,
      success: true,
      message: "Specialty created successfully",
      data: specialty,
    });
  },
);

export const GetsSpecialtyController = catchAsync(
  async (req: Request, res: Response) => {
    const specialty = await GetsSpecialtyService();

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Specialty fetched successfully",
      data: specialty,
    });
  },
);

export const DeleteSpecialtyController = catchAsync(
  async (req: Request, res: Response) => {
    await DeleteSpecialtyService(req.params.id as string);

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Specialty deleted successfully",
    });
  },
);
