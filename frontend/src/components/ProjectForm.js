import React, { useState } from 'react';
import axios from 'axios';
import '../Css/ProjectStyles.css'; // Import CSS for project form styling

function ProjectForm({ fetchProjects }) {
  const [formData, setFormData] = useState({
    name: '',
    project_manager_id: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/projects', formData)
      .then(response => {
        console.log(response.data);
        fetchProjects(); // Refresh projects list after successful creation
        setFormData({
          name: '',
          project_manager_id: '',
        });
      })
      .catch(error => {
        console.error('Error creating project:', error);
      });
  };

  return (
    <div className="project-form">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Project Name" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="project_manager_id" placeholder="Project Manager ID" value={formData.project_manager_id} onChange={handleInputChange} required />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;
