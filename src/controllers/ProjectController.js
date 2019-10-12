class ProjectController {
  //GET /projects => lista todos
  async index(req, res){
    return res.json(req.projects);
  }

  //POST /projects => criar projeto ({ id: "1", title: "Novo projeto", tasks: [] })
  async create(req, res) {
    const { id, title } = req.body;
    //instancia os atributos do objeto
    const project = {
      id,
      title,
      tasks: []
    };
    //envia as alterações para o objeto
    req.projects.push(project);
    //retorna o objeto em formato JSON
    return res.json(project);
  }

  //PUT /projects/:id => alterar o título com base no id
  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const project = req.projects.find(p => p.id === id);

    project.title = title;

    return res.json(req.projects);
  }

  async delete(req,res) {
    const { id } = req.params;
    const { projects } = req;

    const projectIndex = projects.findIndex(p => p.id === id);

    projects.splice(projectIndex, 1);

    return res.json(projects);
  }
}

export default new ProjectController();