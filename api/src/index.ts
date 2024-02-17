import Hapi from "@hapi/hapi";
import { makeDb, startDatabase } from "./database";
import dotenv from "dotenv";

const init = async () => {
  dotenv.config();
  const db = makeDb();

  const server = Hapi.server({
    port: 4000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route({
    method: "GET",
    path: "/tasks",
    handler: async (r, h) => {
      try {
        //modified the query to always get the tasks ordered by id
        const { rows } = await db.raw("select * from tasks order by tasks_id");
        return h.response(rows).code(200);
      } catch (error) {
        console.error(error);
        return h.response().code(500);
      }
    },
  });

  server.route({
    method: "POST",
    path: "/task",
    handler: async (r, h) => {
      try {
        //Getting the task content from the request and inserting it into the tasks table
        const task = r.payload;
        await db("tasks").insert({ content: task });
        return h.response({ message: "Task inserted succesfully" }).code(200);
      } catch (error) {
        console.error(error);
        return h.response().code(500);
      }
    },
  });

  server.route({
    method: "DELETE",
    path: "/task/{userId}",
    handler: async (r, h) => {
      try {
        //Deleting the task that has the same id of the one clicked
        const id = r.params.userId;
        await db("tasks").where("tasks_id", id).del();
        return h.response({ message: "Task deleted succesfully" }).code(200);
      } catch (error) {
        console.error(error);
        return h.response().code(500);
      }
    },
  });

  server.route({
    method: "PUT",
    path: "/task/{userId}",
    handler: async (r, h) => {
      try {
        //Updating the status of the task that has the same id of the one clicked
        const id = r.params.userId;
        const payload = r.payload as {status: boolean};
        await db("tasks").where('tasks_id', id).update({ is_complete: !payload.status });
        return h.response({ message: `Task updated succesfully`}).code(200);
      } catch (error) {
        console.error(error);
        return h.response().code(500);
      }
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
startDatabase();
