// src/components/Preview.jsx

// We just receive the data props
export default function Preview({
  name,
  headline,
  bio,
  photo,
  skills,
  github,
  linkedin,
  twitter,
  projects
}) {
  return (
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
                {project.image && (
                  <img src={project.image} alt={project.title} className="w-full h-32 object-cover rounded-md mb-2" />
                )}
                <div className="flex justify-between items-center">
                  <h5 className="text-lg font-semibold text-gray-800">{project.title || 'Project Title'}</h5>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm font-medium hover:underline">
                      View Project
                    </a>
                  )}
                </div>
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
  );
}