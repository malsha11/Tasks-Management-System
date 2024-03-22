import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EngineerList from './components/TasksList';
import TasksList from './components/TasksList';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            
          </ul>
        </nav>

        <Routes>
          <Route path="/tasks" element={<TasksList/>} />
          <Route path="/projects" element={<ProjectList/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
