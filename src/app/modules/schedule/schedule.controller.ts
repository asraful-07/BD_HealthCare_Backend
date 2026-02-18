import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  CreateScheduleService,
  DeleteScheduleService,
  GetScheduleService,
  GetsScheduleService,
  UpdateScheduleService,
} from "./schedule.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query.interface";

export const CreateScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const schedule = await CreateScheduleService(payload);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Created schedule successfully",
      data: schedule,
    });
  },
);

export const GetsScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const schedule = await GetsScheduleService(query as IQueryParams);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Created fetch successfully",
      data: schedule,
      meta: schedule.meta,
    });
  },
);

export const GetScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const schedule = await GetScheduleService(req.params.id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Created fetch successfully",
      data: schedule,
    });
  },
);

export const UpdateScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const schedule = await UpdateScheduleService(
      req.params.id as string,
      payload,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Updated schedule successfully",
      data: schedule,
    });
  },
);

export const DeleteScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    await DeleteScheduleService(req.params.id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Deleted schedule successfully",
    });
  },
);
