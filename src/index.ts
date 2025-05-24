import { Elysia } from "elysia";

const app = new Elysia()
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
  
  // listen
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
 