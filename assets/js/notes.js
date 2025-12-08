// Notes interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Position notes in sidebar based on text position
    function positionNotes() {
        const notesList = document.querySelector('.notes-list');
        const noteItems = document.querySelectorAll('.note-item');
        const postContainer = document.querySelector('.post-container');
        
        if (!notesList || !postContainer || noteItems.length === 0) return;
        
        // Reset all positioning
        noteItems.forEach(item => {
            item.style.position = '';
            item.style.top = '';
        });
        
        // Get the post container's top position (where the content starts)
        const postContainerRect = postContainer.getBoundingClientRect();
        const postContainerTop = postContainerRect.top + window.scrollY;
        const postContainerHeight = postContainerRect.height;
        
        // Get the notes list position
        const notesListRect = notesList.getBoundingClientRect();
        const notesListTop = notesListRect.top + window.scrollY;
        
        // Calculate the offset between the post container and notes list
        const verticalOffset = notesListTop - postContainerTop;
        
        // Calculate positions for each note based on marker positions within post content
        const notePositions = [];
        
        noteItems.forEach(item => {
            const noteId = item.dataset.noteId;
            const marker = document.querySelector(`.inline-note-marker[data-note-id="${noteId}"]`);
            
            if (marker) {
                // Get marker position relative to post container
                const markerRect = marker.getBoundingClientRect();
                const markerViewportTop = markerRect.top;
                const postViewportTop = postContainerRect.top;
                
                // Calculate marker position relative to post container
                const markerRelativeTop = markerViewportTop - postViewportTop;
                
                // Calculate desired position in notes list (accounting for the offset)
                const desiredTop = markerRelativeTop + verticalOffset;
                
                notePositions.push({
                    item: item,
                    noteId: noteId,
                    desiredTop: desiredTop,
                    height: item.offsetHeight
                });
            }
        });
        
        // Sort by desired position
        notePositions.sort((a, b) => a.desiredTop - b.desiredTop);
        
        // Position notes with collision detection and spacing
        let currentY = 0;
        notePositions.forEach(notePos => {
            // Position at desired location or below previous note, whichever is lower
            let finalTop = Math.max(currentY, notePos.desiredTop);
            
            // Ensure note doesn't go above the start of the notes list
            finalTop = Math.max(0, finalTop);
            
            notePos.item.style.position = 'absolute';
            notePos.item.style.top = `${finalTop}px`;
            notePos.item.style.left = '0';
            notePos.item.style.right = '0';
            notePos.item.style.margin = '0';
            
            // Update current Y position for next note (add spacing)
            currentY = finalTop + notePos.height + 10;
        });
        
        // Set minimum height for notes list to accommodate all positioned items
        if (notePositions.length > 0) {
            const lastNote = notePositions[notePositions.length - 1];
            const totalHeight = parseFloat(lastNote.item.style.top) + lastNote.height + 10;
            notesList.style.minHeight = `${totalHeight}px`;
        }
    }
    
    // Initial positioning after a slight delay to ensure layout is complete
    setTimeout(positionNotes, 100);
    
    // Reposition on window resize and scroll
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(positionNotes, 250);
    });
    
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(positionNotes, 50);
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
                
                // Scroll into view if needed
                const notesList = document.querySelector('.notes-list');
                if (notesList) {
                    const noteTop = targetNote.offsetTop;
                    const noteHeight = targetNote.offsetHeight;
                    const listScrollTop = notesList.scrollTop;
                    const listHeight = notesList.offsetHeight;
                    
                    if (noteTop < listScrollTop) {
                        notesList.scrollTop = noteTop;
                    } else if (noteTop + noteHeight > listScrollTop + listHeight) {
                        notesList.scrollTop = noteTop + noteHeight - listHeight;
                    }
                }
            }
        });
    });
});
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
