// src/components/Form.jsx

// We must receive all the props from App.jsx
export default function Form({
  name, setName,
  headline, setHeadline,
  bio, setBio,
  handlePhotoChange,
  skills, setSkills,
  github, setGithub,
  linkedin, setLinkedin,
  twitter, setTwitter,
  projects,
  handleAddProject,
  handleRemoveProject,
  handleProjectChange,
  handleProjectPhotoChange
}) {
  return (
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
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
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
        
      </form>
    </section>
  );
}