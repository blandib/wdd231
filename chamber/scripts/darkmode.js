document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    console.log('Dark mode button:', darkModeToggle); // Debug: Check if button is found
    console.log('Body element:', body); // Debug: Check if body is found

    // Check for saved dark mode preference in localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    console.log('Saved dark mode:', savedDarkMode); // Debug: Check saved preference

    if (savedDarkMode === 'enabled') {
        body.classList.add('dark-mode');
    } else if (savedDarkMode === 'alt') {
        body.classList.add('dark-mode-alt');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', function () {
        console.log('Button clicked!'); // Debug: Check if click event fires

        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('dark-mode-alt');
            localStorage.setItem('darkMode', 'alt');
            console.log('Switched to alt dark mode');
        } else if (body.classList.contains('dark-mode-alt')) {
            body.classList.remove('dark-mode-alt');
            localStorage.setItem('darkMode', 'disabled');
            console.log('Switched to light mode');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            console.log('Switched to dark mode');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger"); 
    const navigation = document.querySelector(".navigation"); 

    // Toggle navigation visibility when hamburger is clicked
    hamburger.addEventListener("click", () => {
        navigation.classList.toggle("active"); 
    });
});

