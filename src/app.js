const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex((repository) => repository.id == id);

  if (repoIndex === -1) {
    response.status(400).json({ error: "repositório não encontrado" });
  }

  repositories[repoIndex] = { ...repositories[repoIndex], title, url, techs };
  console.log(repositories[repoIndex]);
  response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repository) => repository.id == id);

  if (repoIndex === -1) {
    response.status(400).json({ error: "repositório não encontrado" });
  }

  repositories.splice(repoIndex, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repository) => repository.id == id);

  if (repoIndex === -1) {
    response.status(400).json({ error: "repositório não encontrado" });
  }

  repositories[repoIndex].likes += 1;

  response.json(repositories[repoIndex]);
});

module.exports = app;
