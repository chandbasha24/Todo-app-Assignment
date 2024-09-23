import React, { useEffect, useState } from 'react';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import API from '../api';
import '../components/styles/Dashboard.css';


export function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks');
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
