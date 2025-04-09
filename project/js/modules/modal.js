export class ModalManager {
    constructor() {
        this.modals = {};
        this.init();
    }

    init() {
        document.querySelectorAll('.modal').forEach(modal => {
            this.modals[modal.id] = modal;
            
            // Close button
            modal.querySelector('.close-modal').addEventListener('click', () => {
                this.closeModal(modal.id);
            });
            
            // Close when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    openModal(modalId) {
        const modal = this.modals[modalId];
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = this.modals[modalId];
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}