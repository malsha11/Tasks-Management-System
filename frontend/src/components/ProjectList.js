import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/ProjectList.css'; // Import CSS file

function ProjectList() {
  const [projects, setProjects] = useState([]);

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

  return (
    <div>
      <h2>Projects</h2>
      <table className="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Project Manager ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
            <td>{project.name}</td>
              <td>{project.project_manager_id}</td>
              <td>
                <button className="update-btn">Update</button>
                <button className="delete-btn">Delete</button>
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

