// CMS JavaScript for Featured Projects Management

// Initialize CMS on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only run on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProjects();
    }
});

// Load featured projects from localStorage and update homepage
function loadFeaturedProjects() {
    console.log('Loading featured projects...');
    const projects = JSON.parse(localStorage.getItem('featuredProjects') || '[]');
    console.log('Found projects:', projects.length);
    
    // If no projects in localStorage, use default projects
    if (projects.length === 0) {
        console.log('No projects found, loading defaults...');
        loadDefaultProjects();
        return;
    }
    
    // Sort by order
    projects.sort((a, b) => a.order - b.order);
    
    // Update the featured projects grid
    updateFeaturedProjectsGrid(projects);
}

// Load default projects if none exist
function loadDefaultProjects() {
    const defaultProjects = [
        {
            id: '1',
            title: 'Modern Estate',
            description: '15,000 sq ft custom home featuring contemporary design and smart home technology',
            image: 'assets/images/portfolio/mansion-1.jpg',
            gallery: ['assets/images/portfolio/mansion-1.jpg'],
            highlights: ['Smart Home Technology', 'Contemporary Design', '15,000 sq ft'],
            order: 1,
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            title: 'Classic Manor',
            description: '12,000 sq ft traditional home with timeless architectural details and premium finishes',
            image: 'assets/images/portfolio/mansion-2.jpg',
            gallery: ['assets/images/portfolio/mansion-2.jpg'],
            highlights: ['Traditional Architecture', 'Premium Finishes', '12,000 sq ft'],
            order: 2,
            createdAt: new Date().toISOString()
        },
        {
            id: '3',
            title: 'Contemporary Villa',
            description: '18,000 sq ft contemporary home with floor-to-ceiling windows and open living spaces',
            image: 'assets/images/portfolio/mansion-3.jpg',
            gallery: ['assets/images/portfolio/mansion-3.jpg'],
            highlights: ['Floor-to-Ceiling Windows', 'Open Living Spaces', '18,000 sq ft'],
            order: 3,
            createdAt: new Date().toISOString()
        },
        {
            id: '4',
            title: 'Mediterranean Estate',
            description: '20,000 sq ft Mediterranean home with courtyard and outdoor living areas',
            image: 'assets/images/portfolio/mansion-4.jpg',
            gallery: ['assets/images/portfolio/mansion-4.jpg'],
            highlights: ['Mediterranean Style', 'Courtyard Design', '20,000 sq ft'],
            order: 4,
            createdAt: new Date().toISOString()
        },
        {
            id: '5',
            title: 'Mountain Retreat',
            description: '14,000 sq ft mountain home with rustic luxury design and panoramic views',
            image: 'assets/images/portfolio/mansion-5.jpg',
            gallery: ['assets/images/portfolio/mansion-5.jpg'],
            highlights: ['Mountain Views', 'Rustic Luxury', '14,000 sq ft'],
            order: 5,
            createdAt: new Date().toISOString()
        },
        {
            id: '6',
            title: 'Corporate Headquarters',
            description: '50,000 sq ft office complex featuring modern design and sustainable building practices',
            image: 'assets/images/portfolio/commercial-1.jpg',
            gallery: ['assets/images/portfolio/commercial-1.jpg'],
            highlights: ['Sustainable Design', 'Modern Architecture', '50,000 sq ft'],
            order: 6,
            createdAt: new Date().toISOString()
        },
        {
            id: '7',
            title: 'Luxury Penthouse',
            description: '8,000 sq ft penthouse with panoramic city views and premium amenities',
            image: 'assets/images/portfolio/project1/hero-slide-6.jpg',
            gallery: ['assets/images/portfolio/project1/hero-slide-6.jpg'],
            highlights: ['City Views', 'Premium Amenities', '8,000 sq ft'],
            order: 7,
            createdAt: new Date().toISOString()
        },
        {
            id: '8',
            title: 'Coastal Villa',
            description: '16,000 sq ft beachfront home with infinity pool and ocean views',
            image: 'assets/images/portfolio/project1/hero-slide-7.jpg',
            gallery: ['assets/images/portfolio/project1/hero-slide-7.jpg'],
            highlights: ['Ocean Views', 'Infinity Pool', '16,000 sq ft'],
            order: 8,
            createdAt: new Date().toISOString()
        },
        {
            id: '9',
            title: 'Historic Renovation',
            description: '10,000 sq ft historic mansion restoration with modern luxury updates',
            image: 'assets/images/portfolio/project1/hero-slide-8.jpg',
            gallery: ['assets/images/portfolio/project1/hero-slide-8.jpg'],
            highlights: ['Historic Restoration', 'Modern Updates', '10,000 sq ft'],
            order: 9,
            createdAt: new Date().toISOString()
        }
    ];
    
    // Save default projects to localStorage
    localStorage.setItem('featuredProjects', JSON.stringify(defaultProjects));
    
    // Update the grid
    updateFeaturedProjectsGrid(defaultProjects);
}

// Update the featured projects grid with project data
function updateFeaturedProjectsGrid(projects) {
    console.log('Updating featured projects grid...');
    const grid = document.querySelector('.featured-projects-grid');
    if (!grid) {
        console.error('Featured projects grid not found!');
        return;
    }
    
    console.log('Grid found, updating with', projects.length, 'projects');
    
    // Generate HTML for featured projects
    const projectsHTML = projects.map(project => `
        <div class="featured-project">
            <div class="project-image" style="background-image: url('${project.image}')">
                <div class="project-overlay">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="project-detail.html?id=${project.id}" class="project-link">LEARN MORE</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update the grid
    grid.innerHTML = projectsHTML;
    console.log('Grid updated successfully');
}

// Add a new project (called from admin panel)
function addProject(projectData) {
    const projects = JSON.parse(localStorage.getItem('featuredProjects') || '[]');
    const newProject = {
        id: Date.now().toString(),
        ...projectData,
        createdAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    localStorage.setItem('featuredProjects', JSON.stringify(projects));
    
    // Update homepage if we're on it
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProjects();
    }
}

// Update a project (called from admin panel)
function updateProject(projectId, projectData) {
    const projects = JSON.parse(localStorage.getItem('featuredProjects') || '[]');
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex !== -1) {
        projects[projectIndex] = { ...projects[projectIndex], ...projectData };
        localStorage.setItem('featuredProjects', JSON.stringify(projects));
        
        // Update homepage if we're on it
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            loadFeaturedProjects();
        }
    }
}

// Delete a project (called from admin panel)
function deleteProject(projectId) {
    const projects = JSON.parse(localStorage.getItem('featuredProjects') || '[]');
    const updatedProjects = projects.filter(p => p.id !== projectId);
    localStorage.setItem('featuredProjects', JSON.stringify(updatedProjects));
    
    // Update homepage if we're on it
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProjects();
    }
}

// Reorder projects (called from admin panel)
function reorderProjects(projectIds) {
    const projects = JSON.parse(localStorage.getItem('featuredProjects') || '[]');
    const reorderedProjects = projectIds.map((id, index) => {
        const project = projects.find(p => p.id === id);
        return { ...project, order: index + 1 };
    });
    
    localStorage.setItem('featuredProjects', JSON.stringify(reorderedProjects));
    
    // Update homepage if we're on it
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProjects();
    }
}

// Get all projects (for admin panel)
function getAllProjects() {
    return JSON.parse(localStorage.getItem('featuredProjects') || '[]');
}

// Export functions for use in admin panel
window.CMS = {
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    getAllProjects,
    loadFeaturedProjects
};
