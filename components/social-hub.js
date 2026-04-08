/**
 * CahyASTRO Portal - Social Hub Component
 */

class SocialHubComponent {
  constructor() {
    this.init();
  }
  
  init() {
    this.displaySocialLinks();
    this.addSocialHoverEffects();
  }
  
  displaySocialLinks() {
    // Links are already in HTML, just add any enhancements
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
        card.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.transform = '';
      });
    });
  }
  
  addSocialHoverEffects() {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.fontSize = '3.5em';
        icon.style.transform = 'scale(1.2) rotate(10deg)';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.fontSize = '3em';
        icon.style.transform = '';
      });
    });
  }
}

window.socialHub = new SocialHubComponent();
console.log('[v0] Social Hub component loaded');
