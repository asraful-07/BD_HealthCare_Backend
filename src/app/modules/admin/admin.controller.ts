import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  GetAdminService,
  GetsAdminService,
  SoftDeleteAdminService,
  UpdatedAdminService,
} from "./admin.service";
import { sendResponse } from "../../shared/sendResponse";

export const GetsAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const admin = GetsAdminService();

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Admin fetch successfully",
      data: admin,
    });
  },
);

export const GetAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const admin = GetAdminService(req.params.id as string);

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Admin fetch successfully",
      data: admin,
    });
  },
);

export const UpdateAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const admin = UpdatedAdminService(req.params.id as string, req.body);

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Admin fetch successfully",
      data: admin,
    });
  },
);

export const SoftDeleteAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const admin = SoftDeleteAdminService(req.params.id as string, user);

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Admin fetch successfully",
      data: admin,
    });
  },
);
