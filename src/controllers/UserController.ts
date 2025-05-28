import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const UserController = {
  list: async () => {
    return await prisma.user.findMany();
  },
  create: async ({
    body,
  }: {
    body: {
      email: string;
      password: string;
    };
  }) => {
    try {
      await prisma.user.create({
        data: body,
      });

      return { message: "User created successfully" };
    } catch (error) {
      return error;
    }
  },
  update: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: { email: string; password: string };
  }) => {
    try {
      await prisma.user.update({
        where: {
          id: parseInt(params.id),
        },
        data: body,
      });

      return { message: "User updated successfully" };
    } catch (error) {
      return error;
    }
  },
  remove: async ({ params }: { params: { id: string } }) => {
    try {
      await prisma.user.delete({
        where: {
          id: parseInt(params.id),
        },
      });

      return { message: "User deleted successfully" };
    } catch (error) {
      return error;
    }
  },
  findSomeField: async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          credit: true,
          level: true,
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  sort: async () => {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          credit: "desc",
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  filter: async () => {
    try {
      const users = await prisma.user.findMany({
        where: {
          level: "user",
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  moreThan: async () => {
    try {
      const users = await prisma.user.findMany({
        where: {
          credit: {
            gt: 100,
          },
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  lessThan: async () => {
    try {
      const users = await prisma.user.findMany({
        where: {
          credit: {
            lt: 200,
          },
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  notEqual: async () => {
    try {
      const users = await prisma.user.findMany({
        where: {
          credit: {
            not: 100,
          },
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  in: async () => {
    try {
      const users = await prisma.user.findMany({
        where: {
          credit: {
            in: [100, 200, 300],
          },
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  isNull: async () => {
    try {
      const users = await prisma.user.findMany({
        where: {
          credit: {
            equals: null,
          },
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  isNotNull: async () => {
    try {
      const users = await prisma.user.findMany({
        where: {
          credit: {
            not: null,
          },
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  between: async () => {
    try {
      const users = await prisma.user.findMany({
        where: {
          credit: {
            gte: 50,
            lte: 250,
          },
        },
      });

      return users;
    } catch (error) {
      return error;
    }
  },
  count: async () => {
    try {
      const totalRow = await prisma.user.count();
      return { totalRow };
    } catch (error) {
      return error;
    }
  },
  sum: async () => {
    try {
      const result = await prisma.user.aggregate({
        _sum: {
          credit: true,
        },
      });
      return { sum: result._sum.credit };
    } catch (error) {
      return error;
    }
  },
  max: async () => {
    try {
      const result = await prisma.user.aggregate({
        _max: {
          credit: true,
        },
      });
      return { max: result._max.credit };
    } catch (error) {
      return error;
    }
  },
  min: async () => {
    try {
      const result = await prisma.user.aggregate({
        _min: {
          credit: true,
        },
      });
      return { min: result._min.credit };
    } catch (error) {
      return error;
    }
  },
  avg: async () => {
    try {
      const result = await prisma.user.aggregate({
        _avg: {
          credit: true,
        },
      });
      return { avg: result._avg.credit };
    } catch (error) {
      return error;
    }
  },
  userAndDepartment: async () => {
    try {
      const users = await prisma.user.findMany({
        include: { department: true },
      });
      
      return { users: users };
    } catch (error) {
      return error;
    }
  },
  signIn: async ({ body }: { body: { email: string, password: string }}) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password,
        },
      });

      return { user: user };
    } catch ( error ) {
      return error;
    }
  }
};
