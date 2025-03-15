document.addEventListener('DOMContentLoaded', () => {
    const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
    const cards = document.querySelector('#cards');
    const loading = document.querySelector('#loading');
    const searchInput = document.querySelector('#search');

    let prophetsData = []; // Store fetched data

    // Fetch prophet data
    async function getProphetData() {
        try {
            loading.style.display = 'block'; // Show loading message
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            prophetsData = data.prophets; // Store data for filtering
            displayProphets(prophetsData); // Display all prophets initially
            console.log('Data loaded:', prophetsData); // Debugging
        } catch (error) {
            console.error('Fetch error:', error);
            cards.innerHTML = '<p>Error loading data. Please try again later.</p>';
        } finally {
            loading.style.display = 'none'; // Hide loading message
        }
    }

    // Display prophets in the cards section
    const displayProphets = (prophets) => {
        cards.innerHTML = ''; // Clear existing cards
        prophets.forEach((prophet, index) => {
            let card = document.createElement('section');
            let fullName = document.createElement('h2');
            let portrait = document.createElement('img');
            let birthdate = document.createElement("p");
            let birthplace = document.createElement("p");

            

            // Add prophet number to the name
            fullName.textContent = `${prophet.name} ${prophet.lastname} – ${index + 1}th`;
            birthdate.textContent = `Brith Date: ${prophet.birthdate}`;
            birthplace.textContent = `Place Of Birth: ${prophet.birthplace}`;

            // Build the image portrait with updated alt text
            portrait.setAttribute('src', prophet.imageurl);
            portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} – ${index + 1}th Latter-day President`);
            portrait.setAttribute('loading', 'lazy');
            portrait.setAttribute('width', '340');
            portrait.setAttribute('height', '440');

            card.appendChild(fullName);
            card.appendChild(portrait);
            card.append(birthdate);
            card.append(birthplace);
            cards.appendChild(card);
        });
    };

    // Filter prophets based on criteria
    const filterProphets = (criteria) => {
        let filteredProphets = [];
        switch (criteria) {
            case 'bornInUtah':
                filteredProphets = prophetsData.filter(prophet => prophet.birthplace?.includes('Utah'));
                break;
            case 'bornOutsideUS':
                filteredProphets = prophetsData.filter(prophet => {
                    const birthplace = prophet.birthplace?.toLowerCase();
                    return !birthplace.includes('united states') && !birthplace.includes('usa');
                });
                break;
            case 'livedTo95':
                filteredProphets = prophetsData.filter(prophet => {
                    const birthYear = parseInt(prophet.birthdate?.split('-')[0]);
                    const deathYear = parseInt(prophet.deathdate?.split('-')[0]);
                    if (isNaN(birthYear)) return false;
                    if (isNaN(deathYear)) return false;
                    return (deathYear - birthYear) >= 95;
                });
                break;
            case 'tenChildren':
                filteredProphets = prophetsData.filter(prophet => prophet.numofchildren >= 10);
                break;
            case 'served15Years':
                filteredProphets = prophetsData.filter(prophet => prophet.length >= 15);
                break;
            default:
                filteredProphets = prophetsData; // Show all prophets
                break;
        }
        displayProphets(filteredProphets);
    };

    // Search prophets by name
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProphets = prophetsData.filter(prophet =>
            `${prophet.name} ${prophet.lastname}`.toLowerCase().includes(searchTerm)
        );
        displayProphets(filteredProphets);
    });

    // Event listeners for buttons
    document.querySelector('#bornInUtah').addEventListener('click', () => filterProphets('bornInUtah'));
    document.querySelector('#bornOutsideUS').addEventListener('click', () => filterProphets('bornOutsideUS'));
    document.querySelector('#livedTo95').addEventListener('click', () => filterProphets('livedTo95'));
    document.querySelector('#tenChildren').addEventListener('click', () => filterProphets('tenChildren'));
    document.querySelector('#served15Years').addEventListener('click', () => filterProphets('served15Years'));
    document.querySelector('#showAll').addEventListener('click', () => filterProphets('all'));

    // Fetch and display data
    getProphetData();
});