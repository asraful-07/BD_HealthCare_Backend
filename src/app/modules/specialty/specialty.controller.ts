import { Request, Response } from "express";
import {
  CreateSpecialtyService,
  GetSpecialtyService,
  GetsSpecialtyService,
  SoftDeleteSpecialtyService,
  UpdateSpecialtyService,
} from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

export const CreateSpecialtyController = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.body);
    // console.log(req.file);
    const payload = {
      ...req.body,
      icon: req.file?.path,
    };

    const specialty = await CreateSpecialtyService(payload);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
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
      httpStatusCode: status.OK,
      success: true,
      message: "Specialty fetched successfully",
      data: specialty,
    });
  },
);

export const GetSpecialtyController = catchAsync(
  async (req: Request, res: Response) => {
    const specialty = await GetSpecialtyService(req.params.id as string);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Specialty fetch successfully",
      data: specialty,
    });
  },
);

export const UpdateSpecialtyController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const specialty = await UpdateSpecialtyService(
      req.params.id as string,
      payload,
    );
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Specialty fetch successfully",
      data: specialty,
    });
  },
);

export const DeleteSpecialtyController = catchAsync(
  async (req: Request, res: Response) => {
    const specialty = await SoftDeleteSpecialtyService(req.params.id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Specialty deleted successfully",
      data: specialty,
    });
  },
);
