import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { PatientLoginService, PatientRegisterService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

export const PatientRegisterController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await PatientRegisterService(payload);
    sendResponse(res, {
      httpStatusCode: 201,
      success: true,
      message: "Created Patient successfully",
      data: result,
    });
  },
);

export const PatientLoginController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const login = await PatientLoginService(payload);

    sendResponse(res, {
      httpStatusCode: 200,
      success: false,
      message: "Login patient successfully",
      data: login,
    });
  },
);
