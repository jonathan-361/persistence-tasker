const API_URL = "http://localhost:3000/tasks";

export async function getTasks() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createTask(title) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return await res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
