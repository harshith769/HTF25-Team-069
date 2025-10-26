// src/App.jsx
 
// Added AI Bio generation and Download .zip functionality

import { useState } from 'react';
import JSZip from 'jszip'; // Added for download
import { saveAs } from 'file-saver'; // Added for download

// This file now just holds the state and passes it to the components

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

 
  // --- Handlers for Projects ---

 
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

  // --- NEW: Handler for AI Bio Generation ---
  const handleAiGenerate = () => {
    if (!skills) {
      alert("Please enter your skills first! The AI needs them for context.");
      return;
    }

    // 1. This is our FAKE AI response.
    const fakeBio = `A highly motivated and results-driven student with strong skills in ${skills}.
Passionate about developing innovative solutions and clean code.
Eager to leverage my technical abilities in a challenging internship role.`;

    // 2. Use a timeout to make it LOOK like it's "thinking"
    setTimeout(() => {
      // 3. Update the bio state
      setBio(fakeBio);
    }, 800); // 800 millisecond delay
  };
  // --- End of AI Bio function ---


  // --- NEW: Handler for Download Button ---
  const handleDownload = () => {
    // 1. Create a new zip file object
    var zip = new JSZip();

    // 2. Create the HTML content
    const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name || 'Portfolio'}'s Portfolio</title>
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <header>
          <h1>${name || 'My Name'}</h1>
          <h2>${headline || 'My Headline'}</h2>
      </header>
      
      <section class="about">
          <h3>About Me</h3>
          <p>${bio || 'This is my bio.'}</p>
      </section>

      <section class="skills">
          <h3>My Skills</h3>
          <div>
              ${skills.split(',').filter(s => s.trim() !== '').map(skill =>
                  `<span>${skill.trim()}</span>`
              ).join('')}
              ${skills.trim() === '' ? '<p>No skills listed.</p>' : ''}
          </div>
      </section>

      <section class="projects">
          <h3>My Projects</h3>
          ${projects.map(project => `
              <div class="project">
                  <h4>${project.title || 'Project Title'}</h4>
                  <p>${project.description || 'No description.'}</p>
                  ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>` : ''}
              </div>
          `).join('')}
          ${projects.length === 0 ? '<p>No projects to show.</p>' : ''}
      </section>

      <footer>
          ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
          ${linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
          ${twitter ? `<a href="${twitter}" target="_blank" rel="noopener noreferrer">Twitter</a>` : ''}
          ${!github && !linkedin && !twitter ? '<p>No social links provided.</p>' : ''}
      </footer>
  </body>
  </html>
    `;

    // 3. Create the CSS content
    const cssContent = `
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; background-color: #f4f7f6; color: #333; line-height: 1.6; }
  header { background-color: #2c3e50; color: white; padding: 3rem 1rem; text-align: center; }
  h1 { margin: 0; font-size: 2.5rem; }
  h2 { color: #bdc3c7; font-weight: normal; font-size: 1.2rem; }
  section { max-width: 800px; margin: 2rem auto; padding: 2rem; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
  h3 { border-bottom: 2px solid #ecf0f1; padding-bottom: 0.5rem; margin-top: 0; color: #2c3e50; font-size: 1.8rem;}
  .skills div { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 1rem; }
  .skills span { background-color: #3498db; color: white; padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.9rem; }
  .project { border: 1px solid #ecf0f1; padding: 1.5rem; border-radius: 5px; margin-bottom: 1.5rem; background-color: #fdfdfd; }
  .project h4 { margin-top: 0; color: #3498db; font-size: 1.3rem; }
  .project p { color: #555; font-size: 0.95rem; }
  .project a { display: inline-block; margin-top: 0.5rem; text-decoration: none; color: #2980b9; font-weight: bold; }
  footer { text-align: center; padding: 2rem 1rem; margin-top: 3rem; background-color: #2c3e50; color: #bdc3c7; }
  footer a { color: white; margin: 0 15px; text-decoration: none; font-weight: bold; }
  footer a:hover { text-decoration: underline; }
  p { margin-top: 0.5rem; } /* Default paragraph margin */
    `;

    // 4. Add the files to the zip
    zip.file("index.html", htmlContent);
    zip.file("style.css", cssContent);
    // Note: Skipping images in the zip for hackathon simplicity

    // 5. Generate the zip file and trigger the download
    zip.generateAsync({ type: "blob" })
       .then(function(content) {
            // Use file-saver library to save the file
            saveAs(content, `${name.toLowerCase().replace(/\s+/g, '-') || 'portfolio'}.zip`);
       });
  };
  // --- End of Download function ---


  // --- JSX Render ---
  return (
  <div className="min-h-screen bg-gray-100">
    <Header />

    {/* Main content grid */}
    <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* --- Column 1: The Form Component (Now correctly rendering the Form only once) --- */}
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
        handleDownload={handleDownload}
        handleAiGenerate={handleAiGenerate}
      />
      
      {/* --- Column 2: The Preview Component (Now correctly rendering the Preview only once) --- */}
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