/**
 * CahyASTRO Portal - Animation Utilities
 */

// Particle System for Galaxy Background
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.init();
    this.animate();
  }
  
  init() {
    for (let i = 0; i < 200; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.5
      });
    }
  }
  
  animate() {
    this.ctx.fillStyle = 'rgba(10, 22, 40, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;
      
      this.ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  resize(width, height) {
    this.width = width;
    this.height = height;
  }
}

// Scroll animations
const ScrollAnimations = {
  // Reveal elements on scroll
  revealOnScroll() {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    const handleScroll = () => {
      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight * 0.85;
        
        if (isVisible && !el.classList.contains('revealed')) {
          el.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  },
  
  // Parallax effect
  parallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(el => {
        const scrollY = window.scrollY;
        const speed = el.dataset.parallax || '0.5';
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
};

// Smooth scroll
function smoothScroll(target) {
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target;
  
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Loading animation
class LoadingAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.progress = 0;
  }
  
  start() {
    this.progress = 0;
    this.animate();
  }
  
  animate() {
    if (this.progress < 90) {
      this.progress += Math.random() * 30;
      if (this.progress > 90) this.progress = 90;
      
      const progressBar = this.container?.querySelector('.loading-progress');
      if (progressBar) {
        progressBar.style.width = this.progress + '%';
      }
      
      setTimeout(() => this.animate(), 200);
    }
  }
  
  finish() {
    this.progress = 100;
    const progressBar = this.container?.querySelector('.loading-progress');
    if (progressBar) {
      progressBar.style.width = '100%';
    }
    
    setTimeout(() => {
      if (this.container) {
        this.container.classList.remove('active');
      }
    }, 500);
  }
}

// Counter animation (for statistics)
class CounterAnimation {
  static animateCounter(element, target) {
    const duration = 1000;
    const startTime = Date.now();
    const start = parseInt(element.textContent) || 0;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (target - start) * progress);
      
      element.textContent = String_(formatNumber(value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
}

// Typewriter effect
class TypewriterEffect {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
  }
  
  start() {
    this.element.textContent = '';
    this.type();
  }
  
  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }
}

// Fade animations
const FadeAnimations = {
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms`;
    
    setTimeout(() => {
      element.style.opacity = '1';
    }, 10);
  },
  
  fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = '0';
  }
};

// Hover effects
const HoverEffects = {
  addHoverScale(element, scale = 1.05) {
    element.addEventListener('mouseenter', () => {
      element.style.transform = `scale(${scale})`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
    });
  },
  
  addHoverGlow(element) {
    element.addEventListener('mouseenter', () => {
      element.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.boxShadow = 'none';
    });
  }
};

// Transition animations
const Transitions = {
  pageTransition(fromPage, toPage, duration = 300) {
    FadeAnimations.fadeOut(fromPage, duration);
    
    setTimeout(() => {
      fromPage.style.display = 'none';
      toPage.style.display = 'block';
      FadeAnimations.fadeIn(toPage, duration);
    }, duration);
  },
  
  modalSlide(modal, direction = 'in', duration = 300) {
    if (direction === 'in') {
      modal.style.transform = 'translateY(100%)';
      modal.style.transition = `transform ${duration}ms`;
      setTimeout(() => {
        modal.style.transform = 'translateY(0)';
      }, 10);
    } else {
      modal.style.transform = 'translateY(100%)';
    }
  }
};

// Debounce function
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

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Request animation frame polyfill and helper
const requestFrame = (callback) => requestAnimationFrame(callback);
const cancelFrame = (id) => cancelAnimationFrame(id);

console.log('[v0] Animations loaded');
