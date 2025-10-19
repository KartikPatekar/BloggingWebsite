// Notes interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Position notes in sidebar based on text position
    function positionNotes() {
        const sidebar = document.querySelector('.sidebar-container');
        const notesList = document.querySelector('.notes-list');
        const noteItems = document.querySelectorAll('.note-item');
        
        if (!sidebar || !notesList || noteItems.length === 0) return;
        
        // Clear any existing positioning
        noteItems.forEach(item => {
            item.style.position = '';
            item.style.top = '';
            item.style.marginBottom = '';
        });
        
        // Get sidebar position and dimensions
        const sidebarRect = sidebar.getBoundingClientRect();
        const sidebarTop = sidebarRect.top + window.scrollY;
        
        // Position each note
        noteItems.forEach(item => {
            const noteId = item.dataset.noteId;
            const marker = document.querySelector(`.inline-note-marker[data-note-id="${noteId}"]`);
            
            if (marker) {
                const markerRect = marker.getBoundingClientRect();
                const markerTop = markerRect.top + window.scrollY;
                
                // Calculate desired position in sidebar
                const desiredTop = markerTop - sidebarTop;
                
                // Check for overlaps with previously positioned notes
                let finalTop = desiredTop;
                const positionedItems = Array.from(noteItems).filter(i => i.style.position === 'absolute');
                
                positionedItems.forEach(positionedItem => {
                    const positionedTop = parseInt(positionedItem.style.top) || 0;
                    const positionedHeight = positionedItem.offsetHeight;
                    
                    // If this note would overlap with a positioned note, adjust down
                    if (finalTop >= positionedTop && finalTop < positionedTop + positionedHeight + 10) {
                        finalTop = positionedTop + positionedHeight + 10;
                    }
                });
                
                // Position the note
                item.style.position = 'absolute';
                item.style.top = `${Math.max(0, finalTop)}px`;
                item.style.width = '100%';
                item.style.marginBottom = '0';
            }
        });
        
        // Set minimum height for notes list to accommodate positioned items
        const maxTop = Math.max(...Array.from(noteItems).map(item => {
            const top = parseInt(item.style.top) || 0;
            return top + item.offsetHeight;
        }));
        
        if (maxTop > 0) {
            notesList.style.minHeight = `${maxTop + 20}px`;
        }
    }
    
    // Initial positioning
    positionNotes();
    
    // Reposition on window resize and scroll
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(positionNotes, 250);
    });
    
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(positionNotes, 100);
    });
    
    // Add click handlers to inline note references
    const noteRefs = document.querySelectorAll('.inline-note-marker .note-ref');
    
    noteRefs.forEach(ref => {
        ref.addEventListener('click', function(e) {
            e.preventDefault();
            const noteId = this.closest('.inline-note-marker').dataset.noteId;
            
            // Remove highlight from all notes
            document.querySelectorAll('.note-item').forEach(item => {
                item.classList.remove('highlighted');
            });
            
            // Highlight the corresponding note in sidebar
            const targetNote = document.querySelector(`.note-item[data-note-id="${noteId}"]`);
            if (targetNote) {
                targetNote.classList.add('highlighted');
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    targetNote.classList.remove('highlighted');
                }, 3000);
            }
        });
    });
    
    // Add click handlers to sidebar note references
    const sidebarNoteRefs = document.querySelectorAll('.note-item .note-ref');
    
    sidebarNoteRefs.forEach(ref => {
        ref.addEventListener('click', function(e) {
            e.preventDefault();
            const noteId = this.closest('.note-item').dataset.noteId;
            
            // Find and scroll to the inline note marker
            const targetMarker = document.querySelector(`.inline-note-marker[data-note-id="${noteId}"]`);
            if (targetMarker) {
                targetMarker.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
});
