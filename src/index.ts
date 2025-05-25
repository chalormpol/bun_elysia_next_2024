import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";

import CustomerController from "./controllers/CustomerController";

const app = new Elysia()

  .use(cors())
  .use(staticPlugin())
  .use(swagger())
  .use(jwt({
    name: "jwt",
    secret: "secret",
  }))

  .get("/customers", CustomerController.list)
  .post("/customers", CustomerController.create)
  .put("/customers/:id", CustomerController.update)
  .delete("/customers/:id", CustomerController.delete)

  .post("/login", async ({ jwt, cookie: {auth} }) => {
    const user = {
      id: 1,
      username: "admin",
      password: "1234",
      level: "admin",
      path: "/profile",
    }

    const token = await jwt.sign(user);

    auth.set({
      value: token,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    })

    return { token: token, user: user };
  })

  .get("/profile", async ({ jwt, cookie: {auth} }) => {
    const token = auth.value;
    const user = await jwt.verify(token);

    return { profile: user };
  })

  .get("/logout", ({ cookie: {auth} }) => {
    auth.remove();

    return { message: "Logged out" };
  })

  .get("/", () => "Hello Elysia")
  .get("/hello", () => "Hello World")

  // get and params
  .get("/hello/:name", ({ params }) => {
    return `Hello ${params.name}`;
  })

  // get and multiple params
  .get("/hello/:name/:age", ({ params }) => {
    const { name, age } = params;

    return `Hello ${name} you are ${age} years old`;
  })

  .get("/customers", () => {
    const customers = [
      { id: 1, name: "John", age: 20 },
      { id: 2, name: "Jane", age: 21 },
      { id: 3, name: "Jim", age: 22 },
      { id: 4, name: "Jill", age: 23 },
    ];

    return customers;
  })

  .get("/customers/:id", ({ params }) => {
    const customers = [
      { id: 1, name: "John", age: 20 },
      { id: 2, name: "Jane", age: 21 },
      { id: 3, name: "Jim", age: 22 },
      { id: 4, name: "Jill", age: 23 },
    ];

    const customer = customers.find((customer) => customer.id === Number(params.id));

    if (!customer) {
      return "Customer not found";
    }

    return customer;
  })

  // example http://localhost:3000/customers/query?name=John&age=20
  .get("/customers/query", ({ query }) => {
    const { name, age } = query;

    return `Hello ${name} you are ${age} years old`;
  })

  .get("/customers/status", () => {
    return new Response("Hello World", { status: 200 });
  })

  // รับค่าจาก body เเบบ 1
  .post("/customers/create1", ({ body }: { body: { name: string; age: number } }) => {
    const name = body.name;
    const age = body.age;

    return `Hello ${name} you are ${age} years old`;
  })

  // รับค่าจาก body เเบบ 2
  .post("/customers/create2", ({ body }) => {
    const { name, age } = body as { name: string; age: number };

    return `Hello ${name} you are ${age} years old`;
  })

  // put เเบบ 1
  .put("/customers/update/:id", ({ params, body }) => {
    const { id } = params;
    const { name, age } = body as { name: string; age: number };

    return `Hello ${name} you are ${age} years old and your id is ${id}`;
  })

  // put เเบบ 2
  .put("/customers/updateAll/:id", ({ params, body }: { params: { id: string }, body: { name: string; age: number } }) => {
    const id = params.id;
    const name = body.name;
    const age = body.age;

    return `Hello ${name} you are ${age} years old and your id is ${id}`;
  })

  // delete
  .delete("/customers/delete/:id", ({ params }) => {
    const id = params.id;

    return `Delete customer with id ${id}`;
  })

  // upload file 
  .post("/upload-file", ({ body }: { body: { file: File } }) => {
    const file = body.file;
    console.log(file);

    Bun.write(`./uploads/` + file.name, file);

    return { message: "File uploaded successfully" };
  })

  // write file
  .get("/write-file", () => {
    Bun.write("test.txt", "Hello World");

    return { message: "File written successfully" };
  })

  // read file
  .get("/read-file", () => {
    const file = Bun.file("test.txt");

    return file.text();
  })
  
  // listen
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
 