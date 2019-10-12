//middleware que checa se o projeto existe
function checkProjectsExists(req, res, next) {
    const { id } = req.params;
    const project = req.projects.find(p => p.id === id);
  
    if (!project) {
      return res.status(400).json({ error: "Nao existe projeto no array" });
    }
  
    return next();
  }

  export default checkProjectsExists;