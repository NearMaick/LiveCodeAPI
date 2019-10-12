import express from "express";
import routes from "./routes";

import CounterReqMiddleware from "./src/middlewares/CounterReqMiddleware";

const projects = [];

const server = express();
//instancia a dependência que lê os aquivos de formato JSON
server.use(express.json());
//usa middleware global que verifica o numero de requisições
server.use(CounterReqMiddleware);
server.use((req, res, next) => {
  req.projects = projects;
  return next();
})
;//cria o objeto no servidor
server.use(routes);

//escuta a porta do servidor para requisições do usuário
server.listen(3000);
