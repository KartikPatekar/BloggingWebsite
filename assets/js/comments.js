// Comments interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Position notes in sidebar based on text position
    function positionNotes() {
        const sidebar = document.querySelector('.sidebar-container');
        const commentsList = document.querySelector('.comments-list');
        const commentItems = document.querySelectorAll('.comment-item');
        
        if (!sidebar || !commentsList || commentItems.length === 0) return;
        
        // Clear any existing positioning
        commentItems.forEach(item => {
            item.style.position = '';
            item.style.top = '';
            item.style.marginBottom = '';
        });
        
        // Get sidebar position and dimensions
        const sidebarRect = sidebar.getBoundingClientRect();
        const sidebarTop = sidebarRect.top + window.scrollY;
        
        // Position each comment
        commentItems.forEach(item => {
            const commentId = item.dataset.commentId;
            const marker = document.querySelector(`.inline-comment-marker[data-comment-id="${commentId}"]`);
            
            if (marker) {
                const markerRect = marker.getBoundingClientRect();
                const markerTop = markerRect.top + window.scrollY;
                
                // Calculate desired position in sidebar
                const desiredTop = markerTop - sidebarTop;
                
                // Check for overlaps with previously positioned comments
                let finalTop = desiredTop;
                const positionedItems = Array.from(commentItems).filter(i => i.style.position === 'absolute');
                
                positionedItems.forEach(positionedItem => {
                    const positionedTop = parseInt(positionedItem.style.top) || 0;
                    const positionedHeight = positionedItem.offsetHeight;
                    
                    // If this comment would overlap with a positioned comment, adjust down
                    if (finalTop >= positionedTop && finalTop < positionedTop + positionedHeight + 10) {
                        finalTop = positionedTop + positionedHeight + 10;
                    }
                });
                
                // Position the comment
                item.style.position = 'absolute';
                item.style.top = `${Math.max(0, finalTop)}px`;
                item.style.width = '100%';
                item.style.marginBottom = '0';
            }
        });
        
        // Set minimum height for comments list to accommodate positioned items
        const maxTop = Math.max(...Array.from(commentItems).map(item => {
            const top = parseInt(item.style.top) || 0;
            return top + item.offsetHeight;
        }));
        
        if (maxTop > 0) {
            commentsList.style.minHeight = `${maxTop + 20}px`;
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
    
    // Add click handlers to inline comment references
    const commentRefs = document.querySelectorAll('.inline-comment-marker .comment-ref');
    
    commentRefs.forEach(ref => {
        ref.addEventListener('click', function(e) {
            e.preventDefault();
            const commentId = this.closest('.inline-comment-marker').dataset.commentId;
            
            // Remove highlight from all comments
            document.querySelectorAll('.comment-item').forEach(item => {
                item.classList.remove('highlighted');
            });
            
            // Highlight the corresponding comment in sidebar
            const targetComment = document.querySelector(`.comment-item[data-comment-id="${commentId}"]`);
            if (targetComment) {
                targetComment.classList.add('highlighted');
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    targetComment.classList.remove('highlighted');
                }, 3000);
            }
        });
    });
    
    // Add click handlers to sidebar comment references
    const sidebarCommentRefs = document.querySelectorAll('.comment-item .comment-ref');
    
    sidebarCommentRefs.forEach(ref => {
        ref.addEventListener('click', function(e) {
            e.preventDefault();
            const commentId = this.closest('.comment-item').dataset.commentId;
            
            // Find and scroll to the inline comment marker
            const targetMarker = document.querySelector(`.inline-comment-marker[data-comment-id="${commentId}"]`);
            if (targetMarker) {
                targetMarker.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
});
