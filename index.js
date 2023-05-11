const PORT = 3333; // Define the port

const express = require("express"); // import express lib from node_modules
const bodyParser = require("body-parser"); // import body-parser from node_modules
const cors = require("cors");
const initServer = require("./lib/initServer"); // Server Listening function

const {
  getAllTodos,
  createTodo,
  deleteTodo,
  findTodo,
  updateTodo,
} = require("./controllers/todoControllers");

const app = express(); // app object that is returned in response to executing the express lib

app.use(cors());
app.use(express.json()); // We used express's json parser middleware
app.use(bodyParser.urlencoded({ extended: false })); // We used bodyParser's encoding middleware

app.get("/", getAllTodos); // Do not that we are only calling the function and not invoking it. Because essentially we don't want to pass the returned value of the function as param to app.get(param1: $route, param2: $controller) and instead it should be just the name of the function without invocation parenthesis.
app.get("/:id", findTodo); // The idea is, that in app.get(param1: $route, param2: $controller), the $controller is a function that is invoked by the runtime, whenever a user sends a request to the $route;
app.post("/", createTodo); // So again, we don't want to return the value that we get as a result of invoking a controller as the second parameter to app.get(). Instead it's just a callback to let the runtime know which function to execute when the said route is accessed via a client request.
app.delete("/:id", deleteTodo);
app.put("/:id", updateTodo);

initServer(app, PORT); // You don't need to be a rocket scientist to understand what happens here. Just browse the source code of this function.
