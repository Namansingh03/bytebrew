import { PrismaClient } from "@prisma/client";

const PrismaClientSingelton = () => {
    return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof PrismaClientSingelton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? PrismaClientSingelton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;