// Toggle section functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all toggle sections
    const toggleSections = document.querySelectorAll('.toggle-section');
    
    toggleSections.forEach(section => {
        const header = section.querySelector('.toggle-header');
        const content = section.querySelector('.toggle-content');
        const button = section.querySelector('.toggle-button');
        
        if (!header || !content || !button) return;
        
        // Set initial state
        const isCollapsed = section.classList.contains('collapsed');
        content.style.display = isCollapsed ? 'none' : 'block';
        button.textContent = isCollapsed ? '▶' : '▼';
        
        // Add click handler to header and button
        header.addEventListener('click', function(e) {
            // Don't toggle if clicking on a link inside the header
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            toggleSection(section);
        });
        
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent header click from also firing
            toggleSection(section);
        });
        
        // Add keyboard support
        header.setAttribute('tabindex', '0');
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection(section);
            }
        });
    });
    
    function toggleSection(section) {
        const content = section.querySelector('.toggle-content');
        const button = section.querySelector('.toggle-button');
        
        if (!content || !button) return;
        
        const isCollapsed = content.style.display === 'none';
        
        // Toggle display
        if (isCollapsed) {
            content.style.display = 'block';
            button.textContent = '▼';
            section.classList.remove('collapsed');
        } else {
            content.style.display = 'none';
            button.textContent = '▶';
            section.classList.add('collapsed');
        }
        
        // Dispatch custom event
        section.dispatchEvent(new CustomEvent('toggle', {
            detail: { collapsed: !isCollapsed }
        }));
    }
    
    // Add global function to toggle sections programmatically
    window.toggleSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section && section.classList.contains('toggle-section')) {
            toggleSection(section);
        }
    };
    
    // Add function to expand/collapse all sections
    window.toggleAllSections = function(action) {
        const sections = document.querySelectorAll('.toggle-section');
        sections.forEach(section => {
            const content = section.querySelector('.toggle-content');
            const button = section.querySelector('.toggle-button');
            
            if (!content || !button) return;
            
            if (action === 'expand') {
                content.style.display = 'block';
                button.textContent = '▼';
                section.classList.remove('collapsed');
            } else if (action === 'collapse') {
                content.style.display = 'none';
                button.textContent = '▶';
                section.classList.add('collapsed');
            } else {
                // Toggle each individually
                const isCollapsed = content.style.display === 'none';
                if (isCollapsed) {
                    content.style.display = 'block';
                    button.textContent = '▼';
                    section.classList.remove('collapsed');
                } else {
                    content.style.display = 'none';
                    button.textContent = '▶';
                    section.classList.add('collapsed');
                }
            }
        });
    };
});

// Optional: Add smooth animation with CSS transitions
// This requires corresponding CSS rules
function addToggleAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .toggle-content {
            transition: max-height 0.3s ease-out, opacity 0.2s ease-out;
            overflow: hidden;
        }
        
        .toggle-content.collapsing {
            max-height: 0;
            opacity: 0;
        }
        
        .toggle-content.expanding {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Call this function if you want animations
// addToggleAnimations();
