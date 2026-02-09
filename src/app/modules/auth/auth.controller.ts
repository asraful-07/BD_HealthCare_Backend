import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { PatientLoginService, PatientRegisterService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import {
  getAccessTokenCookie,
  refreshTokenCookie,
  setBetterAuthSessionCookie,
} from "../../utils/token";

export const PatientRegisterController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await PatientRegisterService(payload);
    const { accessToken, refreshToken, token, ...rest } = result;

    getAccessTokenCookie(res, accessToken);
    refreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token as string);

    sendResponse(res, {
      httpStatusCode: 201,
      success: true,
      message: "Created Patient successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest,
      },
    });
  },
);

export const PatientLoginController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await PatientLoginService(payload);
    const { accessToken, refreshToken, token, ...rest } = result;

    getAccessTokenCookie(res, accessToken);
    refreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
      httpStatusCode: 200,
      success: false,
      message: "Login patient successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest,
      },
    });
  },
);
