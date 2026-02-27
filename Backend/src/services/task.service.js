const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../data/tasks.json");

function readTasks() {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

exports.getAll = () => {
  return readTasks();
};

exports.create = (title) => {
  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  return newTask;
};

exports.remove = (id) => {
  const tasks = readTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === filteredTasks.length) {
    return false;
  }

  writeTasks(filteredTasks);
  return true;
};
