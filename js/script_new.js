// Navigation mobile et interactions dynamiques
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle menu mobile
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Fermer le menu mobile quand on clique sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // Scroll spy pour la navigation
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`[href="#${sectionId}"]`);
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  // Mise à jour de la navigation active lors du scroll
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initialisation

  // Animation navbar au scroll
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', function() {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // Animation des éléments au scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Animation spéciale pour les cartes
        if (entry.target.classList.contains('project-card') || 
            entry.target.classList.contains('publication-card') ||
            entry.target.classList.contains('skill-category')) {
          entry.target.style.animationDelay = Math.random() * 0.5 + 's';
          entry.target.classList.add('animate-in');
        }
      }
    });
  }, observerOptions);

  // Observer toutes les sections et cartes
  document.querySelectorAll('.section, .project-card, .publication-card, .skill-category').forEach(el => {
    observer.observe(el);
  });

  // Animation des statistiques
  const stats = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent.replace('+', '');
        let currentValue = 0;
        const increment = parseInt(finalValue) / 50;
        const hasPlus = target.textContent.includes('+');
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= parseInt(finalValue)) {
            target.textContent = finalValue + (hasPlus ? '+' : '');
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '');
          }
        }, 30);
        
        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => {
    statsObserver.observe(stat);
  });

  // Smooth scroll pour les liens internes
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70; // Hauteur de la navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Gestion des compétences avec hover effect
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(skill => {
    skill.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    skill.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  console.log('🚀 Site web d\'Éric Mermet chargé avec succès !');
});

// Fonction utilitaire pour debounce (optimisation des événements)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
