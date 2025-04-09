// Fetch news from API
async function fetchNews() {
    try {
        
        const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=2ac4569774584e5db36142473ea758c5");
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles.slice(0, 3)); // Show first 3 articles
        } else {
            showFallbackNews();
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        showFallbackNews();
    }
}

// Display news from API
function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear existing content
    
    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.className = "news-card";
        
        // Format date
        const newsDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        
        newsCard.innerHTML = `
            <h3>${article.title || "No title available"}</h3>
            <p class="news-date">${newsDate}</p>
            <p class="news-excerpt">${article.description || "No description available"}...</p>
            <a href="${article.url}" target="_blank" class="news-link">Read More</a>
        `;
        
        newsContainer.appendChild(newsCard);
    });
}

// Fallback if API fails
function showFallbackNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = `
        <div class="news-card">
            <h3>Latest Project Released</h3>
            <p class="news-date">${new Date().toLocaleDateString()}</p>
            <p class="news-excerpt">Check out my newest portfolio project showcasing modern web development techniques...</p>
            <a href="#projects" class="news-link">View Project</a>
        </div>
        <div class="news-card">
            <h3>Website Redesign</h3>
            <p class="news-date">${new Date().toLocaleDateString()}</p>
            <p class="news-excerpt">My portfolio has been updated with new features and improved accessibility...</p>
            <a href="#about" class="news-link">Learn More</a>
        </div>
    `;
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", fetchNews);
