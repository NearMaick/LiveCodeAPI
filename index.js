const express = require("express");

const server = express();
//instancia a dependência que lê os aquivos de formato JSON
server.use(express.json());
//cria o objeto no servidor
const projects = [];
let numberOfRequests = 0;
//middleware que checa se o projeto existe
function checkProjectsExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: "Nao exite projeto no array" });
  }

  return next();
}
/**********************
**tambem posso fazer dessa forma **

function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

*******************/
//cria um middleware global que verifica o numero de requisições
server.use((req, res, next) => {
  numberOfRequests++;
  console.log(`Número de requisições: ${numberOfRequests}`);

  next();
});
//POST /projects => criar projeto ({ id: "1", title: "Novo projeto", tasks: [] })
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  //instancia os atributos do objeto
  const project = {
    id,
    title,
    tasks: []
  };
  //envia as alterações para o objeto
  projects.push(project);
  //retorna o objeto em formato JSON
  return res.json(project);
});
//GET /projects => lista todos
server.get("/projects", (req, res) => {
  return res.json(projects);
});
//PUT /projects/:id => alterar o título com base no id
server.put("/projects/:id", checkProjectsExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(projects);
});
//DELETE /projects/:id => apagar projeto com base no id
server.delete("/projects/:id", checkProjectsExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});
//POST /projects/:id/tasks => alterar a tarefa com base no id
server.post("/projects/:id/tasks", checkProjectsExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  projects.tasks.push(title);

  return res.json(project);
});
//escuta a porta do servidor para requisições do usuário
server.listen(3000);
