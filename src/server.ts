import { createServer, Model, Response } from "miragejs";
import { v4 } from "uuid";

export function makeServer() {
  return createServer({
    models: {
      todo: Model, // Оставляем в единственном числе
    },

    seeds(server) {
      server.create("todo", {
        id: v4(),
        name: "Learn about callbacks",
        status: "non-completed",
      });
      server.create("todo", {
        id: v4(),
        name: "Learn about promises",
        status: "non-completed",
      });
      server.create("todo", {
        id: v4(),
        name: "Learn about async/await",
        status: "non-completed",
      });
      server.create("todo", {
        id: v4(),
        name: "Learn about fetch",
        status: "non-completed",
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/todos", (schema) => {
        return schema.all("todo");
      });

      this.get("/todos/:id", (schema, request) => {
        const id = request.params.id;
        const todo = schema.find("todo", id);
        return todo ?? new Response(404, {}, { error: "Todo not found" });
      });

      this.post("/todos", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("todo", {
          ...attrs,
          id: v4(),
          status: "non-completed",
        });
      });

      this.patch("/todos/:id", (schema, request) => {
        const id = request.params.id;
        const todo = schema.find("todo", id);

        if (todo) {
          const attrs = JSON.parse(request.requestBody);
          todo.update(attrs);
          return todo;
        }

        return new Response(404, {}, { error: "Todo not found" });
      });

      this.delete("/todos/:id", (schema, request) => {
        const id = request.params.id;
        const todo = schema.find("todo", id);
        if (todo) {
          todo.destroy();
          return new Response(204, {}, {});
        }
        return new Response(404, {}, { error: "Todo not found" });
      });
    },
  });
}
