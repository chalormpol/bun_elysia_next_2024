const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const DepartmentController = {
  list: async () => {
    const list = await prisma.department.findMany({
      include: {
        users: true,
      },
    });
    return { list: list };
  },
  usersInDepartment: async ({ params }: { params: { id: string } }) => {
    try {
      const users = await prisma.department.findMany({
        where: { 
            id: parseInt(params.id) 
        },
        include: { 
            users: {
                select: {
                    id: true,
                    email: true,
                    level: true,
                    credit: true,
                },
                where: {
                    level: "user"
                }
            } 
        },
        orderBy: {
            id: "asc"
        },
      });
      return { users: users };
    } catch (error) {
      return error;
    }
  },
  createDepartmentAndUser: async ({ body }: { 
    body: { 
        department: {
            name: string,
        },
        users: {
            email: string,
            password: string,
        }[]
    }}) => {
    try {
      const department = await prisma.department.create({
        data: {
            name: body.department.name,
        },
      });

      await prisma.user.createMany({
        data: body.users.map((user) => ({
            email: user.email,
            password: user.password,
            departmentId: department.id,
        })),
      });

      return { message: "Department and users created successfully" };

    // Example body
    //   {
    //     "department": {
    //       "name":"Marketing"
    //     },
    //     "users": [
    //       {
    //         "email":"mar1@gmail.com",
    //         "password":"1234"
    //       },
    //       {
    //         "email":"mar2@gmail.com",
    //         "password":"1234"
    //       },
    //       {
    //         "email":"mar3@gmail.com",
    //         "password":"1234"
    //       }
    //     ]
    //   }

    } catch (error) {
      return error;
    }
  },
  countUsersInDepartment: async () => {
    try {
      const countUsersInDepartment = await prisma.department.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              users: true,
            },
          },
        },
      });
      return { count: countUsersInDepartment };
    } catch (error) {
      return error;
    }
  }

};
