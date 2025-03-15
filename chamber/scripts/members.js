document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    // Fetch and display members once
    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json'); // Fetch data from the JSON file
            const members = await response.json();
            displayMembers(members); // Display default view
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    // Function to display members
    function displayMembers(members) {
        membersContainer.innerHTML = ''; // Clear previous content

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            memberCard.innerHTML = `
                <img src="${member.images}" alt="${member.name}" class="member-image">
                <h2>${member.name}</h2>
                <p><strong>Description:</strong> ${member.description}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
            `;

            membersContainer.appendChild(memberCard);
        });
    }

    // Event listener for Grid View button
    gridViewButton.addEventListener('click', () => {
        membersContainer.classList.add('grid-view');
        membersContainer.classList.remove('list-view');
        toggleImages('show'); // Show images for grid view
    });

    // Event listener for List View button
    listViewButton.addEventListener('click', () => {
        membersContainer.classList.add('list-view');
        membersContainer.classList.remove('grid-view');
        toggleImages('hide'); // Hide images for list view
    });

    // Function to toggle images visibility
    function toggleImages(action) {
        const images = document.querySelectorAll('.member-image');
        images.forEach(img => {
            img.style.display = action === 'hide' ? 'none' : 'block';
        });
    }

    // Load members on page load
    fetchMembers();
});
