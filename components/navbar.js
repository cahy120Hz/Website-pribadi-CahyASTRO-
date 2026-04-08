/**
 * CahyASTRO Portal - Navigation Bar Component
 */

class NavBar {
  constructor() {
    this.navMenu = document.getElementById('navMenu');
    this.hamburgerMenu = document.getElementById('hamburgerMenu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    // Mobile menu toggle
    if (this.hamburgerMenu) {
      this.hamburgerMenu.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        window.app.navigateTo(page);
        this.closeMobileMenu();
      });
    });
  }
  
  toggleMobileMenu() {
    if (this.navMenu) {
      this.navMenu.classList.toggle('active');
    }
  }
  
  closeMobileMenu() {
    if (this.navMenu) {
      this.navMenu.classList.remove('active');
    }
  }
  
  setActiveLink(page) {
    this.navLinks.forEach(link => {
      if (link.dataset.page === page) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

console.log('[v0] NavBar component loaded');
