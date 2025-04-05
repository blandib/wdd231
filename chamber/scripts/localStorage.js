// Sidebar element to display messages
const sidebarMessage = document.querySelector(".sidebar-message");

// Get the last visit date from localStorage
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now(); // Current time in milliseconds

// Store the current date for future visits
localStorage.setItem("lastVisit", currentVisit);

let message;

// Check if this is the user's first visit
if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentVisit - parseInt(lastVisit); // Difference in milliseconds
    const daysBetween = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

    if (timeDifference < (1000 * 60 * 60 * 24)) { // Less than a day
        message = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysBetween} days ago.`;
    }
}

// Display the message in the sidebar
if (sidebarMessage) {
    sidebarMessage.textContent = message;
}

//==================================================================

document.addEventListener('DOMContentLoaded', function() {
    // First load the JSON data
    fetch('data/locations.json')
        .then(response => response.json())
        .then(locationsData => {
            // Now that we have the data, set up the button handlers
            const learnMoreButtons = document.querySelectorAll('.card button');
            const modal = document.getElementById('detailsModal');
            const closeBtn = document.querySelector('.close');

            learnMoreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const card = this.closest('.card');
                    const title = card.querySelector('h2').textContent;
                    
                    // Find matching data in the loaded JSON
                    const location = locationsData.find(loc => loc.title === title);
                    
                    if (location) {
                        document.getElementById('modalTitle').textContent = location.title;
                        document.getElementById('modalImage').src = location.image;
                        document.getElementById('modalImage').alt = location.title;
                        document.getElementById('modalAddress').textContent = location.address;
                        document.getElementById('modalDetails').textContent = location.details;
                        
                        modal.style.display = "block";
                    }
                });
            });

            // Close modal handlers
            closeBtn.addEventListener('click', function() {
                modal.style.display = "none";
            });

            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        })
        .catch(error => {
            console.error('Error loading location data:', error);
            // Show error to user
            document.getElementById('sidebarMessage').textContent = 'Failed to load location details.';
        });
});