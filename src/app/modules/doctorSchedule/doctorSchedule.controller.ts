import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import {
  CreateDoctorScheduleService,
  DeleteDoctorScheduleService,
  GetDoctorSchedulesService,
  GetMyDoctorSchedulesService,
  GetsDoctorSchedulesService,
  UpdateDoctorScheduleService,
} from "./doctorSchedule.service";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query.interface";

export const CreateDoctorScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const schedule = await CreateDoctorScheduleService(user, payload);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Created doctor schedule successfully",
      data: schedule,
    });
  },
);

export const GetMyDoctorSchedulesController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const query = req.query;
    const result = await GetMyDoctorSchedulesService(
      user,
      query as IQueryParams,
    );
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Doctor schedules retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

export const GetsDoctorSchedulesController = catchAsync(
  async (req: Request, res: Response) => {
    const quey = req.query;
    const schedule = await GetsDoctorSchedulesService(quey as IQueryParams);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor schedule fetch successfully",
      data: schedule,
      meta: schedule.meta,
    });
  },
);

export const GetDoctorSchedulesController = catchAsync(
  async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId;
    const scheduleId = req.params.scheduleId;
    const schedule = await GetDoctorSchedulesService(
      doctorId as string,
      scheduleId as string,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor schedule fetch successfully",
      data: schedule,
    });
  },
);

export const UpdateDoctorScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const schedule = await UpdateDoctorScheduleService(user, payload);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Updated doctor schedule successfully",
      data: schedule,
    });
  },
);

export const DeleteDoctorScheduleController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user;
    const schedule = await DeleteDoctorScheduleService(id as string, user);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Created doctor schedule successfully",
      data: schedule,
    });
  },
);
