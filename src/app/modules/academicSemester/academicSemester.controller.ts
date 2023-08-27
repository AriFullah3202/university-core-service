import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created',
    data: result,
  });
});
const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getAllFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFromDb,
};
