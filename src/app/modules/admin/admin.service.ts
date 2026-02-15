import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateAdminPayload } from "./admin.interface";
import { IRequestUser } from "../../interfaces/requestUser.interface";

export const GetsAdminService = async () => {
  const result = await prisma.admin.findMany({
    include: {
      user: true,
    },
  });
  return result;
};

export const GetAdminService = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const UpdatedAdminService = async (
  id: string,
  payload: IUpdateAdminPayload,
) => {
  const adminExists = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  });

  if (!adminExists) {
    throw new AppError(status.NOT_FOUND, "Admin not found");
  }

  const { admin } = payload;

  const result = await prisma.admin.update({
    where: {
      id: id,
    },
    data: {
      ...admin,
    },
  });
  return result;
};

//TODO soft delete admin user by setting isDeleted to true and also delete the user session and account
//TODO Validate who is deleting the admin user. Only super admin can delete admin user and only super admin can delete super admin user but admin user cannot delete super admin user
export const SoftDeleteAdminService = async (
  id: string,
  user: IRequestUser,
) => {
  const adminExists = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  });

  if (!adminExists) {
    throw new AppError(status.NOT_FOUND, "Admin not found");
  }

  if (adminExists.id === user.userId) {
    throw new AppError(status.BAD_REQUEST, "You cannot delete yourself");
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.admin.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
        updatedAt: new Date(),
      },
    });

    await tx.user.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
        updatedAt: new Date(),
      },
    });

    await tx.session.deleteMany({
      where: {
        userId: adminExists.id,
      },
    });

    await tx.account.deleteMany({
      where: {
        userId: adminExists.id,
      },
    });

    const admin = GetAdminService(id);
    return admin;
  });
  return result;
};
