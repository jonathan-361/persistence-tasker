<script setup>
import { ref, onMounted } from "vue";
import { getTasks, createTask, deleteTask } from "../services/taskService";

const tasks = ref([]);
const newTask = ref("");
const loading = ref(false);

async function fetchTasks() {
  loading.value = true;
  try {
    tasks.value = await getTasks();
  } finally {
    loading.value = false;
  }
}

async function addTask() {
  if (!newTask.value.trim()) return;

  const created = await createTask(newTask.value);
  tasks.value.push(created);
  newTask.value = "";
}

async function removeTask(id) {
  await deleteTask(id);
  tasks.value = tasks.value.filter((task) => task.id !== id);
}

onMounted(fetchTasks);
</script>

<template>
  <div>
    <p v-if="loading">Cargando...</p>

    <div>
      <input v-model="newTask" placeholder="Nueva tarea" />
      <button @click="addTask">Agregar</button>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="removeTask(task.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>
