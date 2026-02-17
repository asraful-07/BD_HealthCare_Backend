import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { CreateScheduleService } from "./schedule.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

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
