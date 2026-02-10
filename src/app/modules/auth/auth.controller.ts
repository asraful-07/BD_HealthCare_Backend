import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  GetMeService,
  GetNewTokenService,
  PatientLoginService,
  PatientRegisterService,
} from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
} from "../../utils/token";
import status from "http-status";
import AppError from "../../errorHelper/AppError";

export const PatientRegisterController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await PatientRegisterService(payload);
    const { accessToken, refreshToken, token, ...rest } = result;

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token as string);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
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

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
      httpStatusCode: status.OK,
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

export const GetMeController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await GetMeService(user);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Welcome your profile",
      data: result,
    });
  },
);

export const GetNewTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];

    if (!refreshToken) {
      throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
    }

    const result = await GetNewTokenService(
      refreshToken,
      betterAuthSessionToken,
    );

    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

    setAccessTokenCookie(res, accessToken);
    setAccessTokenCookie(res, newRefreshToken);
    setBetterAuthSessionCookie(res, sessionToken);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "New tokens generated successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        sessionToken,
      },
    });
  },
);
