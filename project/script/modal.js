 
 // Progress bar script
 window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("pageProgressBar").style.width = scrolled + "%";
}


  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
        
  darkModeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      
      if (isDark) {
          html.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
      } else {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
      }
  });

  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
  }

 