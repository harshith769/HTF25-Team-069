// src/App.jsx
// This file now just holds the state and passes it to the components

import { useState } from 'react';
import Form from './components/Form';       // <-- IMPORT
import Preview from './components/Preview'; // <-- IMPORT

// Header component
function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Folyx</h1>
      </div>
    </header>
  );
}

// Main App Component
export default function App() {
  // --- All our state lives here in the main App ---
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);
  const [skills, setSkills] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [projects, setProjects] = useState([]);

  // --- All our handler functions also live here ---
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { title: '', description: '', link: '', image: null }
    ]);
  };

  const handleRemoveProject = (indexToRemove) => {
    setProjects(projects.filter((_, index) => index !== indexToRemove));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = projects.map((project, i) => {
      if (i === index) {
        return { ...project, [field]: value };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleProjectPhotoChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedProjects = projects.map((project, i) => {
        if (i === index) {
          return { ...project, image: URL.createObjectURL(file) };
        }
        return project;
      });
      setProjects(updatedProjects);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Main content grid */}
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* --- Column 1: The Form Component --- */}
        <Form
          name={name} setName={setName}
          headline={headline} setHeadline={setHeadline}
          bio={bio} setBio={setBio}
          handlePhotoChange={handlePhotoChange}
          skills={skills} setSkills={setSkills}
          github={github} setGithub={setGithub}
          linkedin={linkedin} setLinkedin={setLinkedin}
          twitter={twitter} setTwitter={setTwitter}
          projects={projects}
          handleAddProject={handleAddProject}
          handleRemoveProject={handleRemoveProject}
          handleProjectChange={handleProjectChange}
          handleProjectPhotoChange={handleProjectPhotoChange}
        />
        
        {/* --- Column 2: The Preview Component --- */}
        <Preview
          name={name}
          headline={headline}
          bio={bio}
          photo={photo}
          skills={skills}
          github={github}
          linkedin={linkedin}
          twitter={twitter}
          projects={projects}
        />

      </main>
    </div>
  );
}