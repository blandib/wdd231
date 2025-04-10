// Configuration (consider moving API key to backend)
const NEWS_API_CONFIG = {
    url: 'https://newsapi.org/v2/top-headlines',
    params: {
      country: 'us',
      // apiKey: process.env.VITE_NEWS_API_KEY // Use this in React/Vite
      apiKey: '2ac4569774584e5db36142473ea758c5' // TEMPORARY - REPLACE WITH PROXY
    }
  };
  
  // Fetch news from API
  async function fetchNews() {
      try {
          const queryString = new URLSearchParams(NEWS_API_CONFIG.params).toString();
          const response = await fetch(`${NEWS_API_CONFIG.url}?${queryString}`);
          
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          
          const data = await response.json();
          data.articles?.length > 0 
              ? displayNews(data.articles.slice(0, 3)) 
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
              ${article.urlToImage ? `
                  <img src="${article.urlToImage}" 
                       alt="${article.title || 'News image'}" 
                       class="news-image">` : ''}
              <h3>${article.title || "No title available"}</h3>
              <p class="news-date">${formatDate(article.publishedAt)}</p>
              <p class="news-excerpt">${article.description || "No description available"}</p>
              <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-link">
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