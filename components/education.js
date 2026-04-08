/**
 * CahyASTRO Portal - Education Component
 */

class EducationComponent {
  constructor() {
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.filteredData = [...window.astronomyData || []];
    
    this.init();
  }
  
  init() {
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      this.search(e.target.value);
    });
    
    document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
      this.filterByCategory(e.target.value);
    });
    
    document.getElementById('prevPage')?.addEventListener('click', () => this.prevPage());
    document.getElementById('nextPage')?.addEventListener('click', () => this.nextPage());
    
    this.displayPage(1);
  }
  
  search(query) {
    if (!query.trim()) {
      this.filteredData = [...window.astronomyData || []];
    } else {
      const q = query.toLowerCase();
      this.filteredData = (window.astronomyData || []).filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q)
      );
    }
    this.currentPage = 1;
    this.displayPage(1);
  }
  
  filterByCategory(category) {
    if (!category) {
      this.filteredData = [...window.astronomyData || []];
    } else {
      this.filteredData = (window.astronomyData || []).filter(item => item.category === category);
    }
    this.currentPage = 1;
    this.displayPage(1);
  }
  
  displayPage(page) {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const items = this.filteredData.slice(start, end);
    
    const content = document.getElementById('educationContent');
    if (!content) return;
    
    content.innerHTML = items.map(item => `
      <div class="education-item">
        <h3>${item.name}</h3>
        <p class="category">${item.category}</p>
        <p class="description">${item.description}</p>
        <div class="facts">
          ${item.facts.map(fact => `<li>${fact}</li>`).join('')}
        </div>
      </div>
    `).join('');
    
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
      const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
      pageInfo.textContent = `Page ${page} of ${totalPages}`;
    }
    
    this.currentPage = page;
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.displayPage(this.currentPage - 1);
    }
  }
  
  nextPage() {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.displayPage(this.currentPage + 1);
    }
  }
}

window.educationComponent = new EducationComponent();
console.log('[v0] Education component loaded');
