require("dotenv").config();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "users.json");

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const LoggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const { isValidUser } = require("./utils/validation");
const authenticateToken = require("./middlewares/auth");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(LoggerMiddleware);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Clase de ExpressJS V3</h1>
    <p>Bienvenido a la clase de ExpressJS</p>
    <p>Servidor corriendo en el puerto ${PORT}</p>
    `);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Mostrar usuario con ID: ${userId}`);
});

app.get("/search", (req, res) => {
  const terms = req.query.termino || "No se proporcionó un término de búsqueda";
  const category = req.query.categoria || "Todo";
  res.send(`
    <h2>Resultados de búsqueda</h2>
    <p>Término de búsqueda: ${terms}</p>
    <p>Categoría: ${category}</p>
  `);
});

app.post("/form", (req, res) => {
  const name = req.body.name || "Anónimo";
  const email = req.body.email || "No proporcionado";
  res.json({
    message: "Formulario recibido",
    data: {
      name,
      email,
    },
  });
});

app.post("/api/data", (req, res) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No se proporcionaron datos" });
  }
  res.status(201).json({
    message: "Datos JSON recibidos correctamente",
    data,
  });
});

app.get("/users", (req, res) => {
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de usuarios" });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de usuarios" });
    }
    const users = JSON.parse(data);
    const validation = isValidUser(newUser, users);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al leer el archivo de usuarios" });
      }
      res.status(201).json(newUser);
    });
  });
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de usuarios" });
    }
    let users = JSON.parse(data);
    users = users.map((user) =>
      user.id === userId ? { ...user, ...updatedUser } : user,
    );
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al actualizar el usuario" });
      }
      res.json(updatedUser);
    });
  });
});
// Por que se utiliza en el res.status(500) el .json()?
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de usuarios" });
    }
    let users = JSON.parse(data);
    users = users.filter((user) => user.id !== userId);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al eliminar el usuario" });
      }
      res.status(204).send();
    });
  });
});

app.get("/error", (req, res, next) => {
  next(new Error("Error Intencional"));
});

app.get("/db_users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.get("/protected-route", authenticateToken, (req, res) => {
  res.send("Esta es una ruta protegida");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
