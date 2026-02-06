import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

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

export const DeleteSpecialtyService = async (
  id: string,
): Promise<Specialty> => {
  const result = await prisma.specialty.delete({
    where: {
      id: id,
    },
  });
  return result;
};
