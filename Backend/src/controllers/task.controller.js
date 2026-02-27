const taskService = require("../services/task.service");

exports.getTasks = (req, res) => {
  const tasks = taskService.getAll();
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  const newTask = taskService.create(title);
  console.log("POST /tasks - ID creado:", newTask.id);
  res.status(201).json(newTask);
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  const deleted = taskService.remove(id);

  if (!deleted) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  console.log("DELETE /tasks - ID eliminado:", id);
  res.json({ message: "Tarea eliminada correctamente" });
};
