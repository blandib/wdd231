import { FormValidator } from '../modules/formValidator.js';
import { CommentManager } from '../modules/commentManager.js';
import { ModalManager } from '../modules/modal.js';

// Initialize modules
window.modalManager = new ModalManager();
const commentManager = new CommentManager();
const formValidator = new FormValidator('contactForm');

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (formValidator.validateForm(e)) {
        const formData = new FormData(e.target);
        const commentData = Object.fromEntries(formData.entries());
        commentManager.addComment(commentData);
    }
});

// Generate sample data if empty
if (localStorage.getItem('comments') === null) {
    const sampleComments = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        firstName: `User${i + 1}`,
        lastName: 'Test',
        email: `user${i + 1}@example.com`,
        city: ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'][i % 5],
        country: ['US', 'UK', 'JP', 'AU', 'FR'][i % 5],
        comment: `This is sample comment ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        date: new Date().toLocaleDateString()
    }));
    
    localStorage.setItem('comments', JSON.stringify(sampleComments));
    commentManager.renderComments();
}