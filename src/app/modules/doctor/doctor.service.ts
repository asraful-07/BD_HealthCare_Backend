import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Doctor, Prisma } from "../../../generated/prisma/client";
import { IQueryParams } from "../../interfaces/query.interface";
import {
  doctorFilterableFields,
  doctorIncludeConfig,
  doctorSearchableFields,
} from "./doctor.constant";

export const GetsDoctorService = async (query: IQueryParams) => {
  // const result = await prisma.doctor.findMany({
  //   include: {
  //     user: true,
  //     specialties: {
  //       select: {
  //         specialty: true,
  //       },
  //     },
  //   },
  // });
  // return result;

  const queryBuilder = new QueryBuilder<
    Doctor,
    Prisma.DoctorWhereInput,
    Prisma.DoctorInclude
  >(prisma.doctor, query, {
    searchableFields: doctorSearchableFields,
    filterableFields: doctorFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .where({
      isDeleted: false,
    })
    .include({
      user: true,
      //? specialties: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    })
    .dynamicInclude(doctorIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();

  console.log(result);
  return result;
};

export const GetDoctorService = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: id,
      isDeleted: false,
    },
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
      appointments: {
        include: {
          patient: true,
          schedule: true,
          prescription: true,
        },
      },
      doctorSchedules: {
        include: {
          schedule: true,
        },
      },
      reviews: true,
    },
  });
  return doctor;
};

export const UpdateDoctorService = async (
  id: string,
  payload: IUpdateDoctorPayload,
) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: {
      id: id,
      isDeleted: false,
    },
  });
  if (!isDoctorExist) {
    throw new Error("Doctor not found");
  }

  const { doctor: doctorData, specialties } = payload;

  await prisma.$transaction(async (tx) => {
    if (doctorData) {
      await tx.doctor.update({
        where: {
          id,
        },
        data: {
          ...doctorData,
        },
      });
    }
    if (specialties && specialties.length > 0) {
      for (const specialty of specialties) {
        const { specialtyId, shouldDelete } = specialty;
        if (shouldDelete) {
          await tx.doctorSpecialty.delete({
            where: {
              doctorId_specialtyId: {
                doctorId: id,
                specialtyId,
              },
            },
          });
        } else {
          await tx.doctorSpecialty.upsert({
            where: {
              doctorId_specialtyId: {
                doctorId: id,
                specialtyId,
              },
            },
            create: {
              doctorId: id,
              specialtyId,
            },
            update: {},
          });
        }
      }
    }
  });

  const doctor = await GetDoctorService(id);

  return doctor;
};

export const SoftDeleteDoctorService = async (id: string) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  if (!isDoctorExist) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }

  await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    await tx.user.update({
      where: {
        id: isDoctorExist.userId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    await tx.session.deleteMany({
      where: {
        id: isDoctorExist.userId,
      },
    });

    await tx.doctorSpecialty.deleteMany({
      where: {
        doctorId: id,
      },
    });
  });

  return { message: "Doctor deleted successfully" };
};
