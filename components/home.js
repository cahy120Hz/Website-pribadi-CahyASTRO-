/**
 * CahyASTRO Portal - Home Page Component
 */

class HomePage {
  constructor() {
    this.quizData = null;
    this.currentQuizIndex = 0;
    this.issData = null;
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadHomeData();
  }
  
  setupEventListeners() {
    // Quick Chat
    const quickChatBtn = document.getElementById('quickChatBtn');
    const quickChatInput = document.getElementById('quickChatInput');
    if (quickChatBtn) quickChatBtn.addEventListener('click', () => this.handleQuickChat());
    if (quickChatInput) quickChatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleQuickChat();
    });
    
    // ISS Tracker
    const issBtn = document.getElementById('issTrackerBtn');
    if (issBtn) issBtn.addEventListener('click', () => this.fetchISS());
    
    // Fact Generator
    const factBtn = document.getElementById('factBtn');
    if (factBtn) factBtn.addEventListener('click', () => this.generateFact());
    
    // News
    const newsBtn = document.getElementById('newsBtn');
    if (newsBtn) newsBtn.addEventListener('click', () => this.loadNews());
    
    // Random Image
    const imageBtn = document.getElementById('imageBtn');
    if (imageBtn) imageBtn.addEventListener('click', () => this.loadRandomImage());
  }
  
  loadHomeData() {
    // Load real-time clock
    this.startClock();
    
    // Load moon phase
    this.updateMoonPhase();
    
    // Generate initial fact
    this.generateFact();
  }
  
  async handleQuickChat() {
    const input = document.getElementById('quickChatInput');
    const response = document.getElementById('quickChatResponse');
    
    if (!input || !input.value.trim()) return;
    
    const message = input.value;
    input.value = '';
    
    if (response) {
      response.innerHTML = '<p class="loading">Thinking...</p>';
    }
    
    try {
      const result = await API.post('/api/chat', { message });
      if (response) {
        response.innerHTML = `<p class="response-text">${String_.sanitize(result.response)}</p>`;
      }
    } catch (error) {
      if (response) {
        response.innerHTML = '<p class="error">Could not get response. Try again.</p>';
      }
    }
  }
  
  async fetchISS() {
    const issData = document.getElementById('issData');
    if (!issData) return;
    
    issData.innerHTML = '<p class="loading">Fetching ISS location...</p>';
    
    try {
      const data = await API.get('https://api.open-notify.org/iss-now.json');
      if (data && data.iss_position) {
        const { latitude, longitude } = data.iss_position;
        issData.innerHTML = `
          <div class="tracker-info">
            <p><strong>Latitude:</strong> ${latitude}°</p>
            <p><strong>Longitude:</strong> ${longitude}°</p>
            <p><strong>Status:</strong> In Orbit</p>
          </div>
        `;
      }
    } catch (error) {
      issData.innerHTML = '<p class="error">Could not fetch ISS data</p>';
    }
  }
  
  updateMoonPhase() {
    const moonDisplay = document.getElementById('moonDisplay');
    const moonText = document.getElementById('moonPhaseText');
    
    if (!moonDisplay) return;
    
    const date = new Date();
    const phases = ['🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔'];
    const day = date.getDate();
    const phase = phases[Math.floor((day / 29.5) * 8) % 8];
    const phaseName = ['Full Moon', 'Waning Gibbous', 'Third Quarter', 'Waning Crescent', 
                       'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous'][Math.floor((day / 29.5) * 8) % 8];
    
    moonDisplay.textContent = phase;
    if (moonText) moonText.textContent = phaseName;
  }
  
  startClock() {
    const clockDisplay = document.getElementById('realtimeClock');
    const dateDisplay = document.getElementById('clockDate');
    
    const updateClock = () => {
      const now = new Date();
      if (clockDisplay) {
        clockDisplay.textContent = now.toLocaleTimeString('en-US', { hour12: false });
      }
      if (dateDisplay) {
        dateDisplay.textContent = Time.formatDate(now);
      }
    };
    
    updateClock();
    setInterval(updateClock, 1000);
  }
  
  generateFact() {
    const facts = [
      "The Sun accounts for 99.86% of all the mass in the Solar System.",
      "A year on Venus is shorter than its day!",
      "Jupiter has a Great Red Spot that's larger than Earth.",
      "Saturn could float in water because it's less dense.",
      "The Andromeda Galaxy is heading toward the Milky Way.",
      "Neutron stars are so dense that a teaspoon would weigh 6 billion tons.",
      "Light from the Sun takes 8 minutes and 20 seconds to reach Earth.",
      "There are more stars than grains of sand on Earth.",
      "A day on Mercury is longer than its year.",
      "The Moon is slowly moving away from Earth."
    ];
    
    const factDisplay = document.getElementById('factDisplay');
    if (factDisplay) {
      const fact = facts[Math.floor(Math.random() * facts.length)];
      factDisplay.textContent = fact;
    }
  }
  
  async loadNews() {
    const newsContainer = document.getElementById('newsContainer');
    if (!newsContainer) return;
    
    newsContainer.innerHTML = '<p class="loading">Loading space news...</p>';
    
    const newsItems = [
      { title: 'James Webb Discovers Ancient Galaxies', date: 'Apr 8, 2024' },
      { title: 'SpaceX Starship Aims for Next Launch', date: 'Apr 6, 2024' },
      { title: 'NASA Extends ISS Operations to 2030', date: 'Apr 5, 2024' },
      { title: 'New Exoplanet in Habitable Zone Found', date: 'Apr 3, 2024' },
      { title: 'Solar Storm Warning for This Week', date: 'Apr 2, 2024' }
    ];
    
    newsContainer.innerHTML = newsItems.map(item => `
      <div class="news-item">
        <h4>${item.title}</h4>
        <p class="date">${item.date}</p>
      </div>
    `).join('');
  }
  
  async loadRandomImage() {
    const imageContainer = document.getElementById('imageContainer');
    if (!imageContainer) return;
    
    imageContainer.innerHTML = '<p class="loading">Loading random space image...</p>';
    
    const nasaKey = 'LWEBjgPhheVUhs8ZmYhN8Y9fEH9DbXiiqUjrd2Nm';
    const randomDate = this.getRandomDate();
    
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${randomDate}`);
      const data = await response.json();
      
      if (data.media_type === 'image') {
        imageContainer.innerHTML = `
          <div class="image-item">
            <img src="${data.url}" alt="${data.title}" style="max-width: 100%; border-radius: 10px;">
            <p class="title">${data.title}</p>
          </div>
        `;
      } else {
        imageContainer.innerHTML = '<p>Could not load image</p>';
      }
    } catch (error) {
      imageContainer.innerHTML = '<p class="error">Failed to load image</p>';
    }
  }
  
  getRandomDate() {
    const start = new Date(2024, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
  });
} else {
  window.homePage = new HomePage();
}

console.log('[v0] Home component loaded');
