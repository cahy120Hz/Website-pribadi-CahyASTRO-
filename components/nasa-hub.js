/**
 * CahyASTRO Portal - NASA Hub Component
 */

class NASAHubComponent {
  constructor() {
    this.apiKey = 'LWEBjgPhheVUhs8ZmYhN8Y9fEH9DbXiiqUjrd2Nm';
    this.init();
  }
  
  init() {
    document.getElementById('nasaTodayBtn')?.addEventListener('click', () => this.loadAPOD());
    document.getElementById('nasaRandomBtn')?.addEventListener('click', () => this.loadRandomAPOD());
    document.getElementById('nasaDateBtn')?.addEventListener('click', () => this.loadAPODByDate());
    
    // Load today's APOD on init
    this.loadAPOD();
  }
  
  async loadAPOD(date = null) {
    const container = document.getElementById('nasaContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Loading NASA APOD...</div>';
    
    try {
      const url = date
        ? `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&date=${date}`
        : `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load APOD');
      
      const data = await response.json();
      this.displayAPOD(data, container);
    } catch (error) {
      container.innerHTML = `<div class="error">Error loading APOD: ${error.message}</div>`;
    }
  }
  
  async loadRandomAPOD() {
    const randomDate = this.getRandomDate();
    await this.loadAPOD(randomDate);
  }
  
  async loadAPODByDate() {
    const datePicker = document.getElementById('nasaDatePicker');
    if (!datePicker || !datePicker.value) return;
    
    await this.loadAPOD(datePicker.value);
  }
  
  displayAPOD(data, container) {
    if (!data) {
      container.innerHTML = '<p>No data available</p>';
      return;
    }
    
    const isImage = data.media_type === 'image';
    const media = isImage
      ? `<img src="${data.url}" alt="${data.title}" style="max-width: 100%; border-radius: 10px;">`
      : `<iframe width="100%" height="400" src="${data.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    
    container.innerHTML = `
      <div class="apod-container">
        <div class="apod-media">${media}</div>
        <div class="apod-info">
          <h2>${String_.sanitize(data.title)}</h2>
          <p class="date">Date: ${data.date}</p>
          <p class="explanation">${String_.sanitize(data.explanation)}</p>
          ${data.copyright ? `<p class="copyright">© ${String_.sanitize(data.copyright)}</p>` : ''}
        </div>
      </div>
    `;
  }
  
  getRandomDate() {
    const start = new Date(2024, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  }
}

window.nasaHub = new NASAHubComponent();
console.log('[v0] NASA Hub component loaded');
