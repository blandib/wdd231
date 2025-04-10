// Configuration - IMPORTANT: This key should not be exposed in production!
const NEWS_API_CONFIG = {
    url: 'https://newsdata.io/api/1/news',  // Corrected API endpoint
    params: {
      country: 'us',
      apikey: 'pub_79512bc61cf85d7952bc82992da8dcf4e8fc2', // Example key format
      language: 'en'
    }
  };
  
  // Fetch news from API
  async function fetchNews() {
    try {
      const queryString = new URLSearchParams(NEWS_API_CONFIG.params).toString();
      const response = await fetch(`${NEWS_API_CONFIG.url}?${queryString}`);
      
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      data.results?.length > 0  // Newsdata.io uses 'results' instead of 'articles'
        ? displayNews(data.results.slice(0, 3)) 
        : showFallbackNews();
    } catch (error) {
      console.error("News fetch failed:", error);
      showFallbackNews();
    }
  }
  
  // Display news articles
  function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    if (!newsContainer) return;
    
    newsContainer.innerHTML = articles.map(article => `
      <div class="news-card">
        ${article.image_url ? `
          <img src="${article.image_url}" 
               alt="${article.title || 'News image'}" 
               class="news-image">` : ''}
        <h3>${article.title || "No title available"}</h3>
        ${article.pubDate ? `<p class="news-date">${formatDate(article.pubDate)}</p>` : ''}
        <p class="news-excerpt">${article.description || "No content available"}</p>
        <a href="${article.link || '#'}" target="_blank" rel="noopener noreferrer" class="news-link">
          Read More
        </a>
      </div>
    `).join('');
  }
  
  // Format date helper
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  
  // Fallback content
  function showFallbackNews() {
    const newsContainer = document.getElementById("news-container");
    if (!newsContainer) return;
    
    newsContainer.innerHTML = `
      <div class="news-card">
        <h3>Latest Project Released</h3>
        <p class="news-date">${formatDate(new Date())}</p>
        <p class="news-excerpt">Check out my newest portfolio project...</p>
        <a href="#projects" class="news-link">View Project</a>
      </div>
      <div class="news-card">
        <h3>Website Redesign</h3>
        <p class="news-date">${formatDate(new Date())}</p>
        <p class="news-excerpt">Improved accessibility and new features...</p>
        <a href="#about" class="news-link">Learn More</a>
      </div>
    `;
  }
  
  // Initialize
  document.addEventListener("DOMContentLoaded", fetchNews);