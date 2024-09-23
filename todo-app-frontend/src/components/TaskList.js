import React, { useState, useEffect, useRef } from 'react';
import API from '../api';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import 'react-toastify/dist/ReactToastify.css';

export function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [filterByPriority, setFilterByPriority] = useState('All');
  const editFormRef = useRef(null);

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await API.get('/tasks');
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  const handleEdit = (task) => {
    setCurrentTask({ title: task.title, description: task.description });
    setEditingTaskId(task._id);
    if (editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tasks/${editingTaskId}`, currentTask);
      setTasks(tasks.map(task => (task._id === editingTaskId ? { ...task, ...currentTask } : task)));
      setCurrentTask({ title: '', description: '' });
      setEditingTaskId(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Error updating task');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorities = { Low: 1, Medium: 2, High: 3 };
      return priorities[a.priority] - priorities[b.priority];
    } else if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else {
      return 0;
    }
  });

  const filteredTasks = filterByPriority === 'All'
    ? sortedTasks
    : sortedTasks.filter(task => task.priority === filterByPriority);

  return (
    <div>
      <h1>Your Tasks</h1>

      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <div>
        <label>Filter by Priority: </label>
        <select value={filterByPriority} onChange={(e) => setFilterByPriority(e.target.value)}>
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate}</p>
            <button onClick={() => handleEdit(task)} title="Edit">
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(task._id)} title="Delete">
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      {editingTaskId && (
        <div ref={editFormRef}>
          <form onSubmit={handleUpdate}>
            <h2>Edit Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
            />
            <textarea
              placeholder="Task Description"
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            />
            <button type="submit">Update Task</button>
            <button type="button" onClick={() => { setCurrentTask({ title: '', description: '' }); setEditingTaskId(null); }}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
