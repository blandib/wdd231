// Get the current year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Get the last modified date
const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
    const lastModified = new Date(document.lastModified);
    lastModifiedParagraph.textContent += lastModified.toLocaleDateString();
}