import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { ICreateSpecialtyPayload } from "./specialty.interface";

export const CreateSpecialtyService = async (
  payload: Specialty,
): Promise<Specialty> => {
  const result = await prisma.specialty.create({
    data: payload,
  });

  return result;
};

export const GetsSpecialtyService = async (): Promise<Specialty[]> => {
  const result = await prisma.specialty.findMany();
  return result;
};

export const GetSpecialtyService = async (id: string) => {
  const result = await prisma.specialty.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const UpdateSpecialtyService = async (
  id: string,
  payload: Partial<ICreateSpecialtyPayload>,
) => {
  const result = await prisma.specialty.update({
    where: {
      id,
    },
    data: {
      ...payload,
      updatedAt: new Date(),
    },
  });

  return result;
};

export const SoftDeleteSpecialtyService = async (id: string) => {
  const result = await prisma.specialty.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return result;
};
