/**
 * CahyASTRO Portal - Main Application Script
 * Comprehensive SPA with all features
 */

// Global App Object
window.app = {
  currentPage: 'home',
  
  init() {
    console.log('[v0] Initializing CahyASTRO Portal...');
    
    // Setup galaxy background
    this.setupGalaxyBackground();
    
    // Setup navigation
    this.setupNavigation();
    
    // Setup loading screen
    this.setupLoadingScreen();
    
    // Route to home
    this.navigateTo('home');
    
    console.log('[v0] App initialized successfully');
  },
  
  setupGalaxyBackground() {
    const canvas = document.getElementById('galaxyCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    
    const particles = [];
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 22, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
        
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener('resize', resizeCanvas);
  },
  
  setupNavigation() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburgerMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
      });
    }
    
    // Navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigateTo(page);
        navMenu?.classList.remove('active');
      });
    });
  },
  
  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    setTimeout(() => {
      loadingScreen.classList.remove('active');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 300);
    }, 1500);
  },
  
  navigateTo(page) {
    console.log('[v0] Navigating to:', page);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.querySelector(`[data-page="${page}"]`);
    if (targetPage) {
      targetPage.classList.add('active');
    }
    
    // Update nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.dataset.page === page) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    this.currentPage = page;
    
    // Track page view
    Analytics.trackPageView(page);
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app.init();
  });
} else {
  window.app.init();
}

console.log('[v0] Main script loaded');
