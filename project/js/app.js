// Using relative paths from projects.html location
async function loadProjects() {
  try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error("Failed to load projects");
      return await response.json();
  } catch (error) {
      console.error("Error loading projects:", error);
      return [];
  }
}

function renderProjects(projects) {
  const container = document.querySelector('.grid-container');
  if (!container) return;
 
  container.innerHTML = projects.map(project => `
    <div class="grid-item">
        <img src="${project.img}" alt="${project.title}">
        <div class="project-content">
            <h2>${project.title}</h2>
            <p class="short-desc">${project.description.substring(0, 150)}...</p>
            <p class="full-desc" style="display:none">${project.description}</p>
            <button class="read-more">Read More</button>
            <a href="${project.url}" target="_blank">View Project</a>
        </div>
    </div>
`).join('');

// Add event listeners for "Read More" buttons
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
        const item = e.target.closest('.grid-item');
        item.querySelector('.short-desc').style.display = 'none';
        item.querySelector('.full-desc').style.display = 'block';
        e.target.style.display = 'none';
    });
});
  

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  const projects = await loadProjects();
  if (projects.length > 0) {
      renderProjects(projects);
  } else {
      document.querySelector('.grid-container').innerHTML = 
          '<p class="error">No projects found. Please try again later.</p>';
  }
});