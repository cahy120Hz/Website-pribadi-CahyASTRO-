/**
 * CahyASTRO Portal - Helper Utilities
 */

// DOM Helpers
const DOM = {
  getElement: (selector) => document.querySelector(selector),
  getElements: (selector) => document.querySelectorAll(selector),
  createElement: (tag, classes = '') => {
    const el = document.createElement(tag);
    if (classes) el.className = classes;
    return el;
  },
  addClass: (el, cls) => el?.classList.add(cls),
  removeClass: (el, cls) => el?.classList.remove(cls),
  toggleClass: (el, cls) => el?.classList.toggle(cls),
  hasClass: (el, cls) => el?.classList.contains(cls),
  setHTML: (el, html) => { if (el) el.innerHTML = html; },
  setText: (el, text) => { if (el) el.textContent = text; },
  setAttr: (el, attr, val) => { if (el) el.setAttribute(attr, val); },
  getAttr: (el, attr) => el?.getAttribute(attr),
  show: (el) => { if (el) el.style.display = ''; },
  hide: (el) => { if (el) el.style.display = 'none'; },
  toggleVisibility: (el) => {
    if (el) el.style.display = el.style.display === 'none' ? '' : 'none';
  }
};

// Math Helpers
const Math_ = {
  // AU to KM
  auToKm: (au) => au * 149597870.7,
  
  // KM to AU
  kmToAu: (km) => km / 149597870.7,
  
  // Weight on different planets
  weightOnPlanet: (earthWeight, planet) => {
    const gravity = {
      'mercury': 0.38,
      'venus': 0.91,
      'earth': 1.0,
      'mars': 0.38,
      'jupiter': 2.36,
      'saturn': 0.92,
      'uranus': 0.89,
      'neptune': 1.12
    };
    return (earthWeight * (gravity[planet] || 1)).toFixed(2);
  },
  
  // Escape velocity: v = √(2GM/r)
  escapeVelocity: (mass, radius) => {
    const G = 6.674e-11;
    return Math.sqrt((2 * G * mass) / radius).toFixed(2);
  },
  
  // Surface gravity: g = GM/r²
  surfaceGravity: (mass, radius) => {
    const G = 6.674e-11;
    return (G * mass / (radius * radius)).toFixed(4);
  },
  
  // Orbital speed: v = √(GM/r)
  orbitalSpeed: (mass, radius) => {
    const G = 6.674e-11;
    return Math.sqrt((G * mass) / radius).toFixed(2);
  },
  
  // Light travel time
  lightTravelTime: (lightYears) => {
    return (lightYears * 365.25).toFixed(1);
  },
  
  // Time dilation: t = t0 / √(1 - v²/c²)
  timeDilation: (velocityPercent) => {
    const v = velocityPercent / 100;
    return (1 / Math.sqrt(1 - (v * v))).toFixed(4);
  },
  
  // Redshift distance
  redshiftDistance: (z) => {
    return (z * 300000).toFixed(0); // Simplified
  },
  
  // Star size (solar radii)
  starSizeComparison: (star) => {
    const sizes = {
      'sun': 1,
      'betelgeuse': 764,
      'sirius': 1.711,
      'antares': 883
    };
    return sizes[star] || 1;
  },
  
  // Luminosity from Stefan-Boltzmann
  luminosity: (temperature, radius) => {
    const L_sun = 3.828e26;
    const T_sun = 5778;
    const R_sun = 6.96e8;
    return ((temperature / T_sun) ** 2) * ((radius) ** 2);
  },
  
  // Temperature conversion
  convertTemp: (value, from, to) => {
    let kelvin = value;
    
    if (from === 'C') kelvin = value + 273.15;
    if (from === 'F') kelvin = (value - 32) * 5/9 + 273.15;
    
    if (to === 'K') return kelvin.toFixed(2);
    if (to === 'C') return (kelvin - 273.15).toFixed(2);
    if (to === 'F') return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
  },
  
  // Mass from density and volume
  massfromDensity: (density, volume) => {
    return (density * volume).toFixed(2);
  },
  
  // Density from mass and volume
  density: (mass, volume) => {
    return (mass / volume).toFixed(4);
  },
  
  // Black hole Schwarzschild radius
  schwarzschildRadius: (massSolar) => {
    const G = 6.674e-11;
    const c = 299792458;
    const M_sun = 1.989e30;
    const mass = massSolar * M_sun;
    return (2 * G * mass / (c * c)).toFixed(2);
  },
  
  // 3D Distance
  distance3D: (x1, y1, z1, x2 = 0, y2 = 0, z2 = 0) => {
    return Math.sqrt(
      (x2 - x1) ** 2 + 
      (y2 - y1) ** 2 + 
      (z2 - z1) ** 2
    ).toFixed(2);
  },
  
  // Orbital period (Kepler's 3rd law)
  orbitalPeriod: (mass, semiMajorAxis) => {
    const G = 6.674e-11;
    return (2 * Math.PI * Math.sqrt(semiMajorAxis ** 3 / (G * mass))).toFixed(2);
  }
};

// String Helpers
const String_ = {
  formatNumber: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  
  sanitize: (str) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, m => map[m]);
  },
  
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  
  truncate: (str, len) => str.length > len ? str.slice(0, len) + '...' : str,
  
  removeHtml: (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
};

// Storage Helpers
const Storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
};

// API Helpers
const API = {
  post: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('[v0] API Error:', error);
      throw error;
    }
  },
  
  get: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('[v0] API Error:', error);
      throw error;
    }
  }
};

// Time Helpers
const Time = {
  format12Hour: (date) => {
    return date.toLocaleTimeString('en-US', { hour12: true });
  },
  
  format24Hour: (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  },
  
  formatDate: (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  },
  
  countDown: (targetDate) => {
    const now = new Date();
    const diff = targetDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    return { days, hours, minutes, seconds };
  }
};

// Analytics
const Analytics = {
  trackEvent: (eventName, data = {}) => {
    console.log('[v0] Event:', eventName, data);
    // TODO: Implement analytics
  },
  
  trackPageView: (page) => {
    console.log('[v0] Page view:', page);
  }
};

console.log('[v0] Helpers loaded');
