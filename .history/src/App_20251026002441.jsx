
// src/App.jsx
// Final step of Phase B: Added repeatable Projects section

import { useState } from 'react';

// Header component with your project name "Folyx"
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
  // --- State ---
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null); // Profile photo URL
  const [skills, setSkills] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');

  // New state for projects (an array of objects)
  const [projects, setProjects] = useState([]);

  // --- Handlers for simple inputs ---
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  // --- Handlers for Projects ---
  
  // Adds a new, blank project to the 'projects' array
  const handleAddProject = () => {
    setProjects([
      ...projects,
      { title: '', description: '', link: '', image: null }
    ]);
  };

  // Removes a project by its index
  const handleRemoveProject = (indexToRemove) => {
    setProjects(projects.filter((_, index) => index !== indexToRemove));
  };

  // Updates a specific field (title, description, link) of a specific project
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = projects.map((project, i) => {
      if (i === index) {
        return { ...project, [field]: value };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Updates the image for a specific project
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
        
        {/* --- Column 1: The Form --- */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Details</h2>
          
          <form className="space-y-4">
            {/* ... (All the fields from before: Name, Headline, Bio, Photo, Skills, Socials) ... */}
            {/* NOTE: I'm hiding them here for brevity, but they are in the full code block */}

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
            {/* --- Bio Field --- */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-600">Short Bio</label>
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
              {/* This is where we loop over the projects array */}
              {projects.map((project, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md mb-4 space-y-3 relative">
                  <h4 className="font-semibold text-gray-600">Project {index + 1}</h4>
                  
                  {/* Title */}
                  <input
                    type="text"
                    placeholder="Project Title"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  />
                  {/* Description */}
                  <textarea
                    placeholder="Project Description"
                    rows="2"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  />
                  {/* Link */}
                  <input
                    type="url"
                    placeholder="Project Link (e.g., GitHub or live demo)"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  />
                  {/* Image */}
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    onChange={(e) => handleProjectPhotoChange(index, e)}
                  />
                  
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
              
              {/* Add Project Button */}
              <button
                type="button"
                onClick={handleAddProject}
                className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700"
              >
                + Add Project
              </button>
            </div>
            
          </form>
        </section>

        {/* --- Column 2: The Live Preview --- */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Live Preview</h2>
          
          <div className="border-4 border-gray-300 rounded-lg min-h-96 p-4">
            
            {/* Preview: Header Section */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shadow-md flex-shrink-0">
                {photo ? <img src={photo} alt="Profile" className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full text-gray-400 text-xs text-center p-2">No Photo</span>}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{name || 'Your Name Here'}</h3>
                <p className="text-lg text-indigo-600">{headline || 'Your Headline Here'}</p>
              </div>
            </div>

            {/* Preview: Bio Section */}
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">About Me</h4>
              <p className="text-gray-600">{bio || 'Your bio will appear here. Write something interesting!'}</p>
            </div>

            {/* Preview: Skills Section */}
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.split(',').filter(skill => skill.trim() !== '').map((skill, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">{skill.trim()}</span>
                ))}
                {skills.trim() === '' && <p className="text-gray-500 text-sm">Your skills will appear here.</p>}
              </div>
            </div>
            
            {/* Preview: Socials Section */}
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">Connect</h4>
              <div className="flex space-x-4">
                {github && <a href={github} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">GitHub</a>}
                {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">LinkedIn</a>}
                {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">Twitter</a>}
                {!github && !linkedin && !twitter && <p className="text-gray-500 text-sm">Your social links will appear here.</p>}
              </div>
            </div>

            {/* --- Preview: Projects Section --- */}
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">My Projects</h4>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="border-b pb-2">
                    {/* Project Image */}
                    {project.image && (
                      <img src={project.image} alt={project.title} className="w-full h-32 object-cover rounded-md mb-2" />
                    )}
                    {/* Project Title and Link */}
                    <div className="flex justify-between items-center">
                      <h5 className="text-lg font-semibold text-gray-800">{project.title || 'Project Title'}</h5>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm font-medium hover:underline">
                          View Project
                        </a>
                      )}
                    </div>
                    {/* Project Description */}
                    <p className="text-gray-600 text-sm">{project.description || 'Project description...'}</p>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="text-gray-500 text-sm">Your projects will appear here.</p>
                )}
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}