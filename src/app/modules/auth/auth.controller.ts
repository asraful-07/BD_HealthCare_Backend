import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  ChangePasswordService,
  forgetPasswordService,
  GetMeService,
  GetNewTokenService,
  googleLoginSuccessService,
  logoutUserService,
  PatientLoginService,
  PatientRegisterService,
  restPasswordService,
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
import { envVars } from "../../config/env";
import { auth } from "../../lib/auth";

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

export const forgetPasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    await forgetPasswordService(email);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Password reset OTP sent to email successfully",
    });
  },
);

export const restPasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const { email, otp, newPassword } = req.body;
    await restPasswordService(email, otp, newPassword);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Password reset successfully",
    });
  },
);

// /api/v1/auth/login/google?redirect=/profile
export const googleLoginController = catchAsync(
  (req: Request, res: Response) => {
    const redirectPath = req.query.redirect || "/dashboard";

    const encodedRedirectPath = encodeURIComponent(redirectPath as string);

    const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;

    res.render("googleRedirect", {
      callbackURL: callbackURL,
      betterAuthUrl: envVars.BETTER_AUTH_URL,
    });
  },
);

export const googleLoginSuccessController = catchAsync(
  async (req: Request, res: Response) => {
    const redirectPath = (req.query.redirect as string) || "/dashboard";

    const sessionToken = req.cookies["better-auth.session_token"];

    if (!sessionToken) {
      return res.redirect(`${envVars.APP_URL}/login?error=oauth_failed`);
    }

    const session = await auth.api.getSession({
      headers: {
        Cookie: `better-auth.session_token=${sessionToken}`,
      },
    });

    if (!session) {
      return res.redirect(`${envVars.APP_URL}/login?error=no_session_found`);
    }

    if (session && !session.user) {
      return res.redirect(`${envVars.APP_URL}/login?error=no_user_found`);
    }

    const result = await googleLoginSuccessService(session);

    const { accessToken, refreshToken } = result;

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    // ?redirect=//profile -> /profile
    const isValidRedirectPath =
      redirectPath.startsWith("/") && !redirectPath.startsWith("//");
    const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";

    res.redirect(`${envVars.APP_URL}${finalRedirectPath}`);
  },
);

export const handleOAuthErrorController = catchAsync(
  (req: Request, res: Response) => {
    const error = (req.query.error as string) || "oauth_failed";
    res.redirect(`${envVars.APP_URL}/login?error=${error}`);
  },
);
