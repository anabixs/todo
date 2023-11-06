import { createServer, Model } from "miragejs";
import { v4 } from "uuid";

export function makeServer() {
  return createServer({
    models: {
      todo: Model,
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
        return schema.todos.all();
      });
      this.get("/todos/:id", (schema, request) => {
        const id = request.params.id;
        return schema.todos.find(id);
      });
      this.post("/todos", function (schema) {
        const attrs = this.normalizedRequestAttrs("todo");
        return schema.todos.create({
          ...attrs,
          id: v4(),
          status: "non-completed",
        });
      });
      this.patch("/todos/:id", function (schema, request) {
        const id = request.params.id;
        const attrs = this.normalizedRequestAttrs("todo");
        return schema.todos.find(id).update(attrs);
      });
      this.delete("/todos/:id", (schema, request) => {
        const id = request.params.id;
        return schema.todos.find(id).destroy();
      });
    },
  });
}
