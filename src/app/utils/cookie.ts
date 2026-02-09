import { CookieOptions, Request, Response } from "express";

export const setCookie = (
  res: Response,
  key: string,
  value: string,
  option: CookieOptions,
) => {
  res.cookie(key, value, option);
};

export const getCookie = (req: Request, key: string) => {
  return req.cookies[key];
};

export const clearCookie = (
  res: Response,
  key: string,
  option: CookieOptions,
) => {
  res.clearCookie(key, option);
};
