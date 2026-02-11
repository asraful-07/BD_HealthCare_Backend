import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  ChangePasswordService,
  GetMeService,
  GetNewTokenService,
  logoutUserService,
  PatientLoginService,
  PatientRegisterService,
  verifyEmailService,
} from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
} from "../../utils/token";
import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { clearCookie } from "../../utils/cookie";

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

export const ChangePasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];

    const result = await ChangePasswordService(payload, betterAuthSessionToken);

    const { accessToken, refreshToken, token } = result;

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  },
);

export const logoutUserController = catchAsync(
  async (req: Request, res: Response) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await logoutUserService(betterAuthSessionToken);
    clearCookie(res, "accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    clearCookie(res, "refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    clearCookie(res, "better-auth.session_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "User logged out successfully",
      data: result,
    });
  },
);

export const verifyEmailController = catchAsync(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await verifyEmailService(email, otp);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Email verified successfully",
    });
  },
);
