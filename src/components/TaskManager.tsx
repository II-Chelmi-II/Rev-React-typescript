import { nanoid } from "nanoid";
import { useState } from "react";
import "./TaskManager.css";

export const TaskManager = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<{ id: string; title: string }[]>([]);

  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, updatedTask: { id: string; title: string }) => {
    const newTasks = tasks.map(task => task.id === id ? updatedTask : task);
    setTasks(newTasks);
  };
  

  const addTask = () => {
    if (title.length < 1) {
      return;
    }
    const newTask = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div>
        <input type="text" onChange={handleSearch} placeholder="Rechercher une tâche" />
      </div>
      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />
        <button onClick={addTask}>Ajouter une tâche</button>
      </div>
      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Ajouter une nouvelle tâche"
                value={task.title}
                onChange={(e) => updateTask(task.id, { id: task.id, title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Terminé</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
