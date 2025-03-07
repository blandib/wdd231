// Select the hamburger button and navigation
const hamburger = document.querySelector(" .hamburger");
const navigation = document.querySelector(" .navigation ");

// Toggle the navigation menu
hamburger.addEventListener("click", () => {
    navigation.classList.toggle("active");
});
