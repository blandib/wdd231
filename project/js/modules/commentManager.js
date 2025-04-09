export class CommentManager {
    constructor() {
        this.comments = JSON.parse(localStorage.getItem('comments')) || [];
        this.commentsContainer = document.getElementById('commentsContainer');
        this.loadMoreBtn = document.getElementById('loadMore');
        this.currentPage = 0;
        this.commentsPerPage = 5;
        
        this.init();
    }

    init() {
        this.renderComments();
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreComments());
    }

    addComment(commentData) {
        const newComment = {
            id: Date.now(),
            ...commentData,
            date: new Date().toLocaleDateString()
        };
        
        this.comments.unshift(newComment);
        localStorage.setItem('comments', JSON.stringify(this.comments));
        this.renderComments();
    }

    renderComments() {
        const start = this.currentPage * this.commentsPerPage;
        const end = start + this.commentsPerPage;
        const commentsToShow = this.comments.slice(0, end);
        
        this.commentsContainer.innerHTML = commentsToShow.map(comment => `
            <div class="comment-card" data-id="${comment.id}">
                <div class="comment-header">
                    <span>${comment.firstName} ${comment.lastName}</span>
                    <span>${comment.date}</span>
                </div>
                <p>${comment.comment.substring(0, 100)}${comment.comment.length > 100 ? '...' : ''}</p>
            </div>
        `).join('');
        
        // Show/hide load more button
        this.loadMoreBtn.style.display = end >= this.comments.length ? 'none' : 'block';
        
        // Add click event to comment cards
        document.querySelectorAll('.comment-card').forEach(card => {
            card.addEventListener('click', () => this.showCommentModal(card.dataset.id));
        });
    }

    loadMoreComments() {
        this.currentPage++;
        this.renderComments();
    }

    showCommentModal(commentId) {
        const comment = this.comments.find(c => c.id == commentId);
        if (comment) {
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <p><strong>Name:</strong> ${comment.firstName} ${comment.lastName}</p>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p><strong>Date:</strong> ${comment.date}</p>
                <p><strong>Comment:</strong> ${comment.comment}</p>
                <p><strong>Location:</strong> ${comment.city}, ${comment.country}</p>
            `;
            
            // Show modal (implementation depends on your modal.js)
            window.modalManager.openModal('commentModal');
        }
    }
}