fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=2ac4569774584e5db36142473ea758c5', {
  method: 'GET', // GET is used to fetch data
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('News Data:', data);
    // Process and display the news data here
  })
  .catch(error => {
    console.error('Error fetching news:', error);
  });
