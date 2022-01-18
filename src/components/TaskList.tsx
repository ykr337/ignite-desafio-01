import { useEffect, useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    console.log("tasks:");
    console.log(tasks);
  }, [tasks]);

  function generateId() {
    let id = Math.random();
    let ids = tasks.map((item) => item.id);
    while (ids.includes(id)) {
      id = Math.random();
    }
    return id;
  }

  function handleCreateNewTask() {
    let id = generateId();
    if (newTaskTitle) {
      setTasks([...tasks, { id: id, isComplete: false, title: newTaskTitle }]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    let tasksComplete = tasks;
    tasksComplete.filter((value, index) => {
      if (value.id === id) {
        tasksComplete[index].isComplete = !value.isComplete;
      }
    });
    setTasks([...tasksComplete]);
  }

  function handleRemoveTask(id: number) {
    let tasksResult = tasks;
    tasksResult.filter((value, index) => {
      if (value.id === id) {
        tasksResult.splice(index, 1);
      }
    });
    setTasks([...tasksResult]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
