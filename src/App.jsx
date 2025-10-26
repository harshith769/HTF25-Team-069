// src/App.jsx
 
// Added AI Bio generation and Download .zip functionality

import { useState } from 'react';
import JSZip from 'jszip'; // Added for download
import { saveAs } from 'file-saver'; // Added for download

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
 

        {/* --- Column 1: The Form --- */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Details</h2>

          <form className="space-y-4">

            {/* --- Name Field --- */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Your Name</label>
              <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {/* --- Headline Field --- */}
            <div>
              <label htmlFor="headline" className="block text-sm font-medium text-gray-600">Headline</label>
              <input type="text" id="headline" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Full Stack Developer" value={headline} onChange={(e) => setHeadline(e.target.value)} />
            </div>
            {/* --- Bio Field with AI Button --- */}
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-600">Short Bio</label>
                {/* THIS IS YOUR AI BUTTON */}
                <button
                  type="button"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  onClick={handleAiGenerate}
                >
                  ✨ Generate with AI
                </button>
              </div>
              <textarea id="bio" rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Tell us a bit about yourself..." value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            {/* --- Photo Field --- */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-600">Profile Photo</label>
              <input type="file" id="photo" accept="image/png, image/jpeg" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" onChange={handlePhotoChange} />
            </div>
            {/* --- Skills Field --- */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-600">Skills (comma separated)</label>
              <input type="text" id="skills" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., React, Node.js, Python" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>
            {/* --- Socials Section --- */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2 pt-2 border-t">Social Links</h3>
              <div className="mb-2">
                <label htmlFor="github" className="block text-sm font-medium text-gray-600">GitHub URL</label>
                <input type="url" id="github" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://github.com/your-username" value={github} onChange={(e) => setGithub(e.target.value)} />
              </div>
              <div className="mb-2">
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-600">LinkedIn URL</label>
                <input type="url" id="linkedin" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://linkedin.com/in/your-username" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-600">Twitter URL (Optional)</label>
                <input type="url" id="twitter" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://twitter.com/your-username" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
              </div>
            </div>

            {/* --- Projects Section --- */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Projects</h3>
              {projects.map((project, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md mb-4 space-y-3 relative">
                  <h4 className="font-semibold text-gray-600">Project {index + 1}</h4>
                  <input
                    type="text"
                    placeholder="Project Title"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  />
                  <textarea
                    placeholder="Project Description"
                    rows="2"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="Project Link (e.g., GitHub or live demo)"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    onChange={(e) => handleProjectPhotoChange(index, e)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddProject}
                className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700"
              >
                + Add Project
              </button>
            </div>

            {/* --- Download Button --- */}
            <div className="pt-6 mt-6 border-t">
              <button
                type="button"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={handleDownload}
              >
                Download Portfolio (.zip)
              </button>
            </div>

          </form>
        </section>

        {/* --- Column 2: The Live Preview --- */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Live Preview</h2>

          <div className="border-4 border-gray-300 rounded-lg min-h-[600px] p-4 overflow-y-auto"> {/* Increased height and scroll */}

            {/* Preview: Header Section */}
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden shadow-md flex-shrink-0 border-2 border-gray-300"> {/* Increased size */}
                {photo ? <img src={photo} alt="Profile" className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full text-gray-400 text-xs text-center p-2">No Photo</span>}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800">{name || 'Your Name Here'}</h3> {/* Increased size */}
                <p className="text-xl text-indigo-600">{headline || 'Your Headline Here'}</p> {/* Increased size */}
              </div>
            </div>

            {/* Preview: Bio Section */}
            <div className="mt-6"> {/* Increased margin */}
              <h4 className="text-2xl font-semibold text-gray-700 border-b pb-1 mb-3">About Me</h4> {/* Increased size */}
              <p className="text-gray-600 leading-relaxed">{bio || 'Your bio will appear here. Write something interesting!'}</p> {/* Better line height */}
            </div>

            {/* Preview: Skills Section */}
           <div className="mt-6">
          <h4 className="text-2xl font-semibold text-gray-700 border-b pb-1 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {/* Start of the map function */}
            {skills.split(',').filter(skill => skill.trim() !== '').map((skill, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1 rounded-full">
                {skill.trim()}
              </span>
            ))} 
            {/* End of the map function - the ')}' closes the map, the '}' closes the outer JS expression */}

            {/* Conditional text if no skills */}
            {skills.trim() === '' && <p className="text-gray-500 text-sm">Your skills will appear here.</p>}
          </div>
        </div>

            {/* --- Preview: Projects Section --- */}
            <div className="mt-6">
              <h4 className="text-2xl font-semibold text-gray-700 border-b pb-1 mb-3">My Projects</h4>
              <div className="space-y-6"> {/* Increased spacing */}
                {projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"> {/* Added card style */}
                    {project.image && (
                      <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-3" /> /* Larger image */
                    )}
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-xl font-semibold text-gray-800">{project.title || 'Project Title'}</h5> {/* Increased size */}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm font-semibold hover:underline">
                          View Project →
                        </a>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-snug">{project.description || 'Project description...'}</p> {/* Better line height */}
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">Your projects will appear here.</p>
                )}
              </div>
            </div>

            {/* Preview: Socials Section */}
            <div className="mt-6 border-t pt-4"> {/* Moved to bottom */}
              <h4 className="text-xl font-semibold text-gray-700 mb-3 text-center">Connect</h4> {/* Centered */}
              <div className="flex justify-center space-x-6"> {/* Centered icons/links */}
                {github && <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-700 font-medium text-sm">GitHub</a>}
                {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-700 font-medium text-sm">LinkedIn</a>}
                {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-700 font-medium text-sm">Twitter</a>}
                {!github && !linkedin && !twitter && <p className="text-gray-500 text-sm">Your social links will appear here.</p>}
              </div>
            </div>

          </div>
        </section>

        
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