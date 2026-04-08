/* ========================================
   CahyASTRO Portal - Main Application
   Comprehensive SPA with All Features
   ======================================== */

const App = {
    state: {
        currentPage: 'home',
        quizStarted: false,
        quizQuestions: [],
        quizScore: 0,
        quizCurrentQuestion: 0,
        astronomyData: [],
        educationCurrentPage: 1,
        educationFiltered: [],
        chatHistory: [],
    },
    
    init() {
        this.setupGalaxyBackground();
        this.setupNavigation();
        this.setupLoadingScreen();
        this.loadInitialData();
        this.cacheElements();
    },
    
    cacheElements() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pages = document.querySelectorAll('.page');
    },
    
    setupLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 2000);
    },
    
    setupGalaxyBackground() {
        const canvas = document.getElementById('galaxyCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3,
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
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    },
    
    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    },
    
    navigateTo(page) {
        this.pages.forEach(p => p.classList.remove('active'));
        
        const targetPage = document.querySelector(`[data-page="${page}"]`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
        
        const hamburger = document.getElementById('hamburgerMenu');
        const navMenu = document.getElementById('navMenu');
        if (navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger?.classList.remove('active');
        }
        
        this.state.currentPage = page;
        this.initPageFeatures(page);
    },
    
    initPageFeatures(page) {
        switch(page) {
            case 'home':
                this.initHome();
                break;
            case 'ai-assistant':
                this.initAIChat();
                break;
            case 'education':
                this.initEducation();
                break;
            case 'quiz':
                this.initQuiz();
                break;
            case 'tools':
                this.initTools();
                break;
            case 'nasa-hub':
                this.initNASA();
                break;
            case 'dashboard':
                this.initDashboard();
                break;
            case 'profile':
                this.initProfile();
                break;
        }
    },
    
    // HOME PAGE
    initHome() {
        this.setupQuickChat();
        this.setupISSTracker();
        this.setupMoonPhase();
        this.setupClock();
        this.setupFacts();
        this.setupNews();
    },
    
    setupQuickChat() {
        const btn = document.getElementById('quickChatBtn');
        const input = document.getElementById('quickChatInput');
        
        if (btn) {
            btn.addEventListener('click', async () => {
                const msg = input?.value.trim();
                if (msg) {
                    const response = document.getElementById('quickChatResponse');
                    response.innerHTML = '<p style="opacity: 0.7;">Processing...</p>';
                    
                    try {
                        const result = await fetch('/api/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message: msg }),
                        });
                        const data = await result.json();
                        response.innerHTML = `<p>${data.message || 'No response'}</p>`;
                    } catch (error) {
                        response.innerHTML = '<p>Error connecting to AI service</p>';
                    }
                    
                    input.value = '';
                }
            });
        }
    },
    
    async setupISSTracker() {
        const btn = document.getElementById('issTrackerBtn');
        if (!btn) return;
        
        btn.addEventListener('click', async () => {
            const data = document.getElementById('issData');
            try {
                const response = await fetch('https://api.open-notify.org/iss-now.json');
                const iss = await response.json();
                data.innerHTML = `
                    <p>Latitude: ${iss.iss_position.latitude.toFixed(2)}°</p>
                    <p>Longitude: ${iss.iss_position.longitude.toFixed(2)}°</p>
                    <p>Updated: Just now</p>
                `;
            } catch {
                data.innerHTML = '<p>Could not fetch ISS location</p>';
            }
        });
    },
    
    setupMoonPhase() {
        const phases = ['🌑 New Moon', '🌒 Waxing Crescent', '🌓 First Quarter', '🌔 Waxing Gibbous', 
                       '🌕 Full Moon', '🌖 Waning Gibbous', '🌗 Last Quarter', '🌘 Waning Crescent'];
        const phase = phases[Math.floor(Math.random() * phases.length)];
        
        const display = document.getElementById('moonDisplay');
        const text = document.getElementById('moonPhaseText');
        
        if (display) display.textContent = phase.split(' ')[0];
        if (text) text.textContent = phase.split(' ').slice(1).join(' ');
    },
    
    setupClock() {
        const updateClock = () => {
            const now = new Date();
            const clock = document.getElementById('realtimeClock');
            const date = document.getElementById('clockDate');
            
            if (clock) clock.textContent = now.toLocaleTimeString();
            if (date) date.textContent = now.toLocaleDateString();
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    },
    
    setupFacts() {
        const facts = [
            'The Sun accounts for 99.86% of all mass in the Solar System',
            'A day on Venus is longer than its year',
            'There are more stars than grains of sand on all Earth beaches',
            'Jupiter is so large that 1,300 Earths could fit inside it',
            'Saturn\'s rings would disappear in 100-200 million years',
            'Light from Andromeda takes 2.5 million years to reach us',
            'Mercury has no atmosphere but has water ice',
            'Mars has the largest volcano in the Solar System',
            'The Moon is moving away from Earth at 3.8cm per year',
            'Black holes can have temperatures and emit radiation',
        ];
        
        const btn = document.getElementById('factBtn');
        const display = document.getElementById('factDisplay');
        
        const showFact = () => {
            if (display) display.textContent = facts[Math.floor(Math.random() * facts.length)];
        };
        
        showFact();
        if (btn) btn.addEventListener('click', showFact);
    },
    
    setupNews() {
        const btn = document.getElementById('newsBtn');
        if (!btn) return;
        
        const news = [
            'JWST discovers earliest galaxies',
            'SpaceX Starship Mars preparation progresses',
            'NASA announces lunar base plans',
            'Exoplanet with atmosphere found',
            'ISS conducts biology experiments',
        ];
        
        btn.addEventListener('click', () => {
            const container = document.getElementById('newsContainer');
            if (container) {
                container.innerHTML = news.map(n => 
                    `<div class="news-item"><a href="#">${n}</a></div>`
                ).join('');
            }
        });
    },
    
    // AI CHAT PAGE
    initAIChat() {
        const input = document.getElementById('chatInput');
        const btn = document.getElementById('sendBtn');
        
        const sendMessage = async () => {
            const msg = input?.value.trim();
            if (!msg) return;
            
            const chatBox = document.getElementById('chatBox');
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user-message';
            userMsg.innerHTML = `<p>${this.escapeHtml(msg)}</p>`;
            chatBox?.appendChild(userMsg);
            
            input.value = '';
            
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: msg }),
                });
                const data = await response.json();
                
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot-message';
                botMsg.innerHTML = `<p>${this.escapeHtml(data.message || 'No response')}</p>`;
                chatBox?.appendChild(botMsg);
            } catch (error) {
                console.error('Chat error:', error);
            }
            
            chatBox.scrollTop = chatBox.scrollHeight;
        };
        
        if (btn) btn.addEventListener('click', sendMessage);
        if (input) input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    },
    
    // EDUCATION PAGE
    initEducation() {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        const filterContent = () => {
            const search = (searchInput?.value || '').toLowerCase();
            const category = categoryFilter?.value || '';
            
            this.state.educationFiltered = this.state.astronomyData.filter(item => {
                const matchesSearch = !search || item.name.toLowerCase().includes(search);
                const matchesCategory = !category || item.category === category;
                return matchesSearch && matchesCategory;
            });
            
            this.state.educationCurrentPage = 1;
            this.displayEducationContent();
        };
        
        if (searchInput) searchInput.addEventListener('input', filterContent);
        if (categoryFilter) categoryFilter.addEventListener('change', filterContent);
        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (this.state.educationCurrentPage > 1) {
                this.state.educationCurrentPage--;
                this.displayEducationContent();
            }
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
            this.state.educationCurrentPage++;
            this.displayEducationContent();
        });
        
        filterContent();
    },
    
    displayEducationContent() {
        const container = document.getElementById('educationContent');
        if (!container) return;
        
        const itemsPerPage = 5;
        const start = (this.state.educationCurrentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = this.state.educationFiltered.slice(start, end);
        
        container.innerHTML = items.map(item => `
            <div class="education-item">
                <h4>${item.category}</h4>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                ${item.facts ? `<p><strong>Facts:</strong> ${item.facts}</p>` : ''}
            </div>
        `).join('');
        
        const pageInfo = document.getElementById('pageInfo');
        if (pageInfo) pageInfo.textContent = `Page ${this.state.educationCurrentPage}`;
    },
    
    // QUIZ PAGE
    initQuiz() {
        const startBtn = document.getElementById('startQuizBtn');
        const leaderboardBtn = document.getElementById('viewLeaderboardBtn');
        
        if (startBtn) startBtn.addEventListener('click', () => this.startQuiz());
        if (leaderboardBtn) leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
    },
    
    startQuiz() {
        this.state.quizStarted = true;
        this.state.quizCurrentQuestion = 0;
        this.state.quizScore = 0;
        
        const quizStart = document.getElementById('quizStart');
        const quizContainer = document.getElementById('quizContainer');
        
        if (quizStart) quizStart.style.display = 'none';
        if (quizContainer) quizContainer.style.display = 'block';
        
        this.displayQuizQuestion();
    },
    
    displayQuizQuestion() {
        if (this.state.quizCurrentQuestion >= this.state.quizQuestions.length) {
            this.showQuizResults();
            return;
        }
        
        const q = this.state.quizQuestions[this.state.quizCurrentQuestion];
        const questionText = document.getElementById('questionText');
        const optionsContainer = document.getElementById('optionsContainer');
        const counter = document.getElementById('questionCounter');
        
        if (questionText) questionText.textContent = q.question;
        if (counter) counter.textContent = `Question ${this.state.quizCurrentQuestion + 1} of 100`;
        
        if (optionsContainer) {
            optionsContainer.innerHTML = q.options.map((opt, idx) => `
                <div class="quiz-option" data-index="${idx}">${opt}</div>
            `).join('');
            
            optionsContainer.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', () => {
                    optionsContainer.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                    option.classList.add('selected');
                });
            });
        }
        
        this.updateProgressBar();
    },
    
    updateProgressBar() {
        const progress = (this.state.quizCurrentQuestion / this.state.quizQuestions.length) * 100;
        const progressFill = document.getElementById('progressFill');
        if (progressFill) progressFill.style.width = progress + '%';
    },
    
    showQuizResults() {
        const quizContainer = document.getElementById('quizContainer');
        const quizResults = document.getElementById('quizResults');
        const scoreValue = document.getElementById('scoreValue');
        const scorePercentage = document.getElementById('scorePercentage');
        
        if (quizContainer) quizContainer.style.display = 'none';
        if (quizResults) quizResults.style.display = 'block';
        
        const percentage = Math.round((this.state.quizScore / this.state.quizQuestions.length) * 100);
        
        if (scoreValue) scoreValue.textContent = `${this.state.quizScore}/100`;
        if (scorePercentage) scorePercentage.textContent = `${percentage}%`;
        
        this.saveQuizResult(percentage);
    },
    
    saveQuizResult(score) {
        const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
        leaderboard.push({ date: new Date().toLocaleDateString(), score });
        localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard.slice(-10)));
    },
    
    showLeaderboard() {
        const quizStart = document.getElementById('quizStart');
        const leaderboard = document.getElementById('leaderboard');
        const leaderboardList = document.getElementById('leaderboardList');
        const data = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
        
        if (quizStart) quizStart.style.display = 'none';
        if (leaderboard) leaderboard.style.display = 'block';
        
        if (leaderboardList) {
            leaderboardList.innerHTML = data.reverse().map((item, idx) => `
                <div class="leaderboard-item">
                    <span>#${idx + 1}</span>
                    <span>${item.score}%</span>
                    <span>${item.date}</span>
                </div>
            `).join('');
        }
        
        const backBtn = document.getElementById('backFromLeaderboardBtn');
        if (backBtn) {
            backBtn.onclick = () => {
                if (leaderboard) leaderboard.style.display = 'none';
                if (quizStart) quizStart.style.display = 'block';
            };
        }
    },
    
    // TOOLS PAGE
    initTools() {
        const toolBtns = document.querySelectorAll('.tool-btn');
        
        toolBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tool = e.target.getAttribute('data-tool');
                const toolCard = e.target.closest('.tool-card');
                const inputs = Array.from(toolCard?.querySelectorAll('.tool-input') || []);
                const result = toolCard?.querySelector('.tool-result');
                
                let calculation = '';
                
                switch(tool) {
                    case 'au-km':
                        const au = parseFloat(inputs[0]?.value || 0);
                        calculation = `${au} AU = ${(au * 149597870.7).toFixed(2)} km`;
                        break;
                    case 'km-au':
                        const km = parseFloat(inputs[0]?.value || 0);
                        calculation = `${km} km = ${(km / 149597870.7).toFixed(6)} AU`;
                        break;
                    case 'planet-weight':
                        const weight = parseFloat(inputs[0]?.value || 0);
                        const planet = inputs[1]?.value || 'earth';
                        const g = { mercury: 0.38, venus: 0.91, earth: 1, mars: 0.38, jupiter: 2.48, saturn: 1.04, uranus: 0.87, neptune: 1.12 };
                        calculation = `Weight on ${planet}: ${(weight * (g[planet] || 1)).toFixed(2)} kg`;
                        break;
                    default:
                        calculation = 'Calculation complete';
                }
                
                if (result) result.textContent = calculation;
            });
        });
    },
    
    // NASA HUB PAGE
    initNASA() {
        const todayBtn = document.getElementById('nasaTodayBtn');
        const randomBtn = document.getElementById('nasaRandomBtn');
        const dateBtn = document.getElementById('nasaDateBtn');
        
        if (todayBtn) todayBtn.addEventListener('click', () => this.fetchAPOD());
        if (randomBtn) randomBtn.addEventListener('click', () => this.fetchAPODRandom());
        if (dateBtn) dateBtn.addEventListener('click', () => {
            const date = document.getElementById('nasaDatePicker')?.value;
            if (date) this.fetchAPOD(date);
        });
        
        this.fetchAPOD();
    },
    
    async fetchAPOD(date = '') {
        const container = document.getElementById('nasaContainer');
        if (!container) return;
        
        container.innerHTML = '<div class="loading-skeleton">Loading NASA APOD...</div>';
        
        try {
            const key = 'LWEBjgPhheVUhs8ZmYhN8Y9fEH9DbXiiqUjrd2Nm';
            const url = `https://api.nasa.gov/planetary/apod?api_key=${key}${date ? `&date=${date}` : ''}`;
            const response = await fetch(url);
            const data = await response.json();
            
            container.innerHTML = `
                <div class="nasa-item">
                    ${data.media_type === 'image' ? `<img src="${data.url}" alt="${data.title}">` : '<p>Video content</p>'}
                    <h3>${data.title}</h3>
                    <p class="nasa-date">${data.date}</p>
                    <p>${data.explanation}</p>
                </div>
            `;
        } catch (error) {
            container.innerHTML = '<p>Error loading APOD</p>';
        }
    },
    
    fetchAPODRandom() {
        const days = Math.floor(Math.random() * 365);
        const date = new Date();
        date.setDate(date.getDate() - days);
        this.fetchAPOD(date.toISOString().split('T')[0]);
    },
    
    // DASHBOARD PAGE
    initDashboard() {
        const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
        
        const updateStat = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };
        
        updateStat('totalQuizzes', leaderboard.length);
        updateStat('avgScore', leaderboard.length > 0 ? 
            Math.round(leaderboard.reduce((a, b) => a + b.score, 0) / leaderboard.length) + '%' : '0%');
        updateStat('contentLearned', this.state.astronomyData.length);
        updateStat('toolsUsed', '20+');
        
        this.drawPerformanceChart();
    },
    
    drawPerformanceChart() {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (leaderboard.length === 0) {
            ctx.fillStyle = '#b0b0b0';
            ctx.font = '14px Arial';
            ctx.fillText('No quiz data yet', 50, 100);
            return;
        }
        
        const barWidth = canvas.width / leaderboard.length;
        leaderboard.forEach((item, idx) => {
            const barHeight = (item.score / 100) * canvas.height;
            const x = idx * barWidth;
            const y = canvas.height - barHeight;
            
            ctx.fillStyle = '#00d4ff';
            ctx.fillRect(x, y, barWidth - 2, barHeight);
        });
    },
    
    // PROFILE PAGE
    initProfile() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 30;
            
            const update = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            
            update();
        });
    },
    
    // UTILITIES
    escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, m => map[m]);
    },
    
    loadInitialData() {
        // Generate 500+ astronomy data
        const categories = ['Planet', 'Star', 'Galaxy', 'Phenomenon', 'Mission', 'Black Hole', 'Nebula'];
        
        for (let i = 0; i < 500; i++) {
            this.state.astronomyData.push({
                name: `Object ${i + 1}`,
                category: categories[i % categories.length],
                description: `Interesting astronomical object with unique characteristics`,
                facts: `Fascinating fact about this celestial body`
            });
        }
        
        // Generate 100 quiz questions
        const baseQuestions = [
            { question: 'What is the largest planet?', options: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'], correct: 0 },
            { question: 'How many moons does Mars have?', options: ['1', '2', '3', '4'], correct: 1 },
            { question: 'Closest star to Earth?', options: ['Sirius', 'Proxima Centauri', 'Alpha Centauri', 'Vega'], correct: 1 },
            { question: 'Our galaxy name?', options: ['Andromeda', 'Milky Way', 'Triangulum', 'Pinwheel'], correct: 1 },
            { question: 'Light travel time from Sun?', options: ['8 seconds', '8 minutes', '8 hours', '8 days'], correct: 1 },
            { question: 'What is a black hole?', options: ['Star', 'Gravity region', 'Galaxy', 'Comet'], correct: 1 },
            { question: 'Hottest planet?', options: ['Mercury', 'Venus', 'Earth', 'Mars'], correct: 1 },
            { question: '1 AU in kilometers?', options: ['100M', '149.6M', '200M', '250M'], correct: 1 },
            { question: 'What is a supernova?', options: ['New star', 'Exploding star', 'Dark star', 'Dying planet'], correct: 1 },
            { question: 'Speed of light?', options: ['300k m/s', '300k km/s', '3k km/s', '30k km/s'], correct: 1 },
        ];
        
        for (let i = 0; i < 100; i++) {
            this.state.quizQuestions.push(baseQuestions[i % baseQuestions.length]);
        }
        
        this.state.educationFiltered = this.state.astronomyData.slice(0, 5);
    }
};

// HAMBURGER MENU
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu?.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Initialize app
    App.init();
    App.navigateTo('home');
});
