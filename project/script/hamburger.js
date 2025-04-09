 // Hamburger Menu Toggle
 const hamburger = document.getElementById('hamburger');
 const navList = document.querySelector('.nav-list'); // Changed to querySelector
 
 hamburger.addEventListener('click', function() {
     // Toggle mobile menu class
     navList.classList.toggle('mobile-active');
     
     // Toggle hamburger animation
     this.classList.toggle('active');
     
     // Update aria-expanded attribute
     const isExpanded = this.getAttribute('aria-expanded') === 'true';
     this.setAttribute('aria-expanded', !isExpanded);
 });
 
 // Close menu when clicking on nav links (optional)
 document.querySelectorAll('.nav-list a').forEach(link => {
     link.addEventListener('click', function() {
         if (window.innerWidth <= 768) {
             navList.classList.remove('mobile-active');
             hamburger.classList.remove('active');
             hamburger.setAttribute('aria-expanded', 'false');
         }
     });
 });