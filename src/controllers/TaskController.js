class TaskController {
  async create(req, res){
  const { id } = req.params;
  const { title } = req.body;
  const { projects } = req;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(project);
  }
}

export default new TaskController();