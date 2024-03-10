import { useState } from "react";
import { useTaskManager } from "./useTaskManager";

export const TaskManager = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { tasks, completeTask, updateTask, addTask, filterTasks } = useTaskManager();

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = filterTasks(searchKeyword);

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
        <button onClick={() => addTask(title)}>Ajouter une tâche</button>
      </div>
      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Ajouter une nouvelle tâche"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Terminé</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
