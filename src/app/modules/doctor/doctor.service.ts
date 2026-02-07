import { prisma } from "../../lib/prisma";

export const GetsDoctorService = async () => {
  const result = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: {
        select: {
          specialty: true,
        },
      },
    },
  });
  return result;
};
