import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IacademicSemesterFilterRequest } from './academicSemester.interface';

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};
const getAllFromDb = async (
  filters: IacademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  console.log(filters);
  const { searchTerm, ...filterData } = filters;
  console.log(filterData);

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: ['title', 'code', 'startMonth', 'endMonth'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereCondition: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'asc' },
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page: page,
      limit: 10,
    },
    data: result,
  };
};
const getDataById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicSemesterService = {
  insertIntoDB,
  getAllFromDb,
  getDataById,
};
