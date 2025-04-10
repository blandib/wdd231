const API_KEY = '4bf897a2-053f-4b74-86ec-80f2e366cc72'; 
const BASE_URL = 'https://api.webz.io/newsApiLite?token=4bf897a2-053f-4b74-86ec-80f2e366cc72&q=Google topic:"financial and economic news" sentiment:negative';

async function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    
    try {
        newsContainer.innerHTML = '<div class="loading">Loading latest headlines...</div>';
        
        const response = await fetch(`${BASE_URL}&token=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `
            <div class="error-message">
                <p>We couldn't load the latest headlines.</p>
                <p>Please check back later or refresh the page.</p>
            </div>
        `;
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `
            <div class="error-message">
                <p>No news articles found at this time.</p>
            </div>
        `;
        return;
    }

    newsContainer.innerHTML = articles.map(article => {
        const publishDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        return `
            <div class="news-card">
                <img src="${article.image || 'https://via.placeholder.com/800x400?text=News+Image'}" 
                     alt="${article.title || 'News image'}">
                <div class="news-content">
                    <h2>${article.title || 'No title available'}</h2>
                    <p>${article.description || 'No description available.'}</p>
                    <div class="news-meta">
                        <span>${publishDate}</span> | 
                        <span>${article.source?.name || 'Unknown source'}</span>
                    </div>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                        Read full story
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

// Load news when page opens
document.addEventListener('DOMContentLoaded', fetchNews);

// Auto-refresh every 5 minutes
setInterval(fetchNews, 300000);