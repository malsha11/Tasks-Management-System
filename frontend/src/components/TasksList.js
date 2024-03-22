// Import required modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/TasksList.css'; // Import CSS file
import Modal from 'react-modal'; // Import React Modal

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    project_id: '',
    title: '',
    tasks_name: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    assigned_to: '',
    due_date: ''
  });
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      axios.put(`http://localhost:5000/api/tasks/${formData.id}`, formData)
        .then(response => {
          console.log(response.data);
          fetchTasks();
          setModalIsOpen(false);
        })
        .catch(error => {
          console.error('Error updating task:', error);
        });
    } else {
      axios.post('http://localhost:5000/api/tasks', formData)
        .then(response => {
          console.log(response.data);
          fetchTasks();
          setModalIsOpen(false);
        })
        .catch(error => {
          console.error('Error creating task:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(response => {
        console.log(response.data);
        fetchTasks();
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const openModal = (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    setFormData({
      id: taskToUpdate.id,
      project_id: taskToUpdate.project_id,
      title: taskToUpdate.title,
      tasks_name: taskToUpdate.tasks_name,
      description: taskToUpdate.description,
      status: taskToUpdate.status,
      priority: taskToUpdate.priority,
      assigned_to: taskToUpdate.assigned_to,
      due_date: taskToUpdate.due_date
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({
      id: '',
      project_id: '',
      title: '',
      tasks_name: '',
      description: '',
      status: 'Pending',
      priority: 'Medium',
      assigned_to: '',
      due_date: ''
    });
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
        <input type="text" name="tasks_name" placeholder="Task Name" value={formData.tasks_name} onChange={handleInputChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
          <option value="Canceled">Canceled</option>
        </select>
        <select name="priority" value={formData.priority} onChange={handleInputChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input type="text" name="assigned_to" placeholder="Assigned To" value={formData.assigned_to} onChange={handleInputChange} />
        <input type="date" name="due_date" placeholder="Due Date" value={formData.due_date} onChange={handleInputChange} required />
        <button type="submit">{formData.id ? 'Update Task' : 'Add Task'}</button>
      </form>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.tasks_name}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.assigned_to}</td>
              <td>{task.due_date}</td>
              <td>
                <button className="update-btn" onClick={() => openModal(task.id)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan="8">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for updating task */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="edit-task-container">
          <h2>{formData.id ? 'Edit Task' : 'Add Task'}</h2>
          <form onSubmit={handleSubmit} className="edit-task-form">
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
            <input type="text" name="tasks_name" placeholder="Task Name" value={formData.tasks_name} onChange={handleInputChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Canceled">Canceled</option>
            </select>
            <select name="priority" value={formData.priority} onChange={handleInputChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input type="text" name="assigned_to" placeholder="Assigned To" value={formData.assigned_to} onChange={handleInputChange} />
            <input type="date" name="due_date" placeholder="Due Date" value={formData.due_date} onChange={handleInputChange} required />
            <button type="submit" className="save-btn">{formData.id ? 'Save Changes' : 'Add Task'}</button>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default TasksList;
