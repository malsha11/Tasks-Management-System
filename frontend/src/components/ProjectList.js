import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/ProjectList.css';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    project_manager_id: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProjectId, setEditProjectId] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProject = () => {
    setIsAdding(true);
  };

  const handleSaveProject = () => {
    if (isAdding) {
      axios.post('http://localhost:5000/api/projects', formData)
        .then(response => {
          console.log(response.data);
          fetchProjects();
          setIsAdding(false);
          setFormData({ name: '', project_manager_id: '' });
        })
        .catch(error => {
          console.error('Error creating project:', error);
        });
    } else if (isEditing && editProjectId) {
      axios.put(`http://localhost:5000/api/projects/${editProjectId}`, formData)
        .then(response => {
          console.log(response.data);
          fetchProjects();
          setIsEditing(false);
          setEditProjectId('');
          setFormData({ name: '', project_manager_id: '' });
        })
        .catch(error => {
          console.error('Error updating project:', error);
        });
    }
  };

  const handleEditProject = (id, name, project_manager_id) => {
    setIsEditing(true);
    setEditProjectId(id);
    setFormData({ name, project_manager_id });
  };

  const handleDeleteProject = (id) => {
    axios.delete(`http://localhost:5000/api/projects/${id}`)
      .then(response => {
        console.log(response.data);
        fetchProjects();
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditProjectId('');
    setFormData({ name: '', project_manager_id: '' });
  };

  return (
    <div>
      <h2>Projects</h2>
      {isAdding || isEditing ? (
        <div>
          <input type="text" name="name" placeholder="Project Name" value={formData.name} onChange={handleInputChange} required />
          <input type="text" name="project_manager_id" placeholder="Project Manager ID" value={formData.project_manager_id} onChange={handleInputChange} required />
          <input type="text" name="tasks_id" placeholder="Tasks ID" value={formData.tasks_id} onChange={handleInputChange} required />
          <input type="text" name="department_id" placeholder="Department" value={formData.department_id} onChange={handleInputChange} required />

          <button className="save-btn" onClick={handleSaveProject}>{isAdding ? 'Add Project' : 'Save Changes'}</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button className="add-btn" onClick={handleAddProject}>Add Project</button>
      )}
      <table className="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Project Manager ID</th>
            <th>Tasks</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.project_manager_id}</td>
              <td>{project.tasks_id}</td>
              <td>{project.department_id}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditProject(project.id, project.name, project.project_manager_id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteProject(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan="3">No projects found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectList;
