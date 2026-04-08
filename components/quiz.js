/**
 * CahyASTRO Portal - Quiz Component
 */

class QuizComponent {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.timePerQuestion = 30;
    this.timeLeft = this.timePerQuestion;
    this.timerInterval = null;
    
    this.init();
  }
  
  init() {
    document.getElementById('startQuizBtn')?.addEventListener('click', () => this.startQuiz());
    document.getElementById('retakeQuizBtn')?.addEventListener('click', () => this.startQuiz());
    document.getElementById('viewLeaderboardBtn')?.addEventListener('click', () => this.showLeaderboard());
    document.getElementById('backFromLeaderboardBtn')?.addEventListener('click', () => this.hideLeaderboard());
    document.getElementById('submitAnswerBtn')?.addEventListener('click', () => this.submitAnswer());
    document.getElementById('skipBtn')?.addEventListener('click', () => this.skipQuestion());
  }
  
  startQuiz() {
    this.questions = window.getRandomQuizQuestions?.(100) || window.quizQuestions || [];
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    this.displayQuestion();
  }
  
  displayQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.finishQuiz();
      return;
    }
    
    const question = this.questions[this.currentIndex];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, idx) => `
      <button class="option-btn" data-index="${idx}">${option}</button>
    `).join('');
    
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    
    const progress = ((this.currentIndex + 1) / this.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('questionCounter').textContent = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
    
    this.startTimer();
  }
  
  startTimer() {
    clearInterval(this.timerInterval);
    this.timeLeft = this.timePerQuestion;
    
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      const mins = Math.floor(this.timeLeft / 60);
      const secs = this.timeLeft % 60;
      document.getElementById('timerDisplay').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      
      if (this.timeLeft <= 0) {
        this.skipQuestion();
      }
    }, 1000);
  }
  
  submitAnswer() {
    const selected = document.querySelector('.option-btn.selected');
    if (!selected) return;
    
    const question = this.questions[this.currentIndex];
    const selectedIndex = parseInt(selected.dataset.index);
    
    this.userAnswers.push(selectedIndex);
    
    if (selectedIndex === question.correct) {
      this.score++;
      selected.classList.add('correct');
    } else {
      selected.classList.add('incorrect');
      document.querySelectorAll('.option-btn')[question.correct].classList.add('correct');
    }
    
    setTimeout(() => {
      this.currentIndex++;
      this.displayQuestion();
    }, 1500);
  }
  
  skipQuestion() {
    const question = this.questions[this.currentIndex];
    this.userAnswers.push(-1);
    
    document.querySelectorAll('.option-btn')[question.correct].classList.add('correct');
    
    setTimeout(() => {
      this.currentIndex++;
      this.displayQuestion();
    }, 1000);
  }
  
  finishQuiz() {
    clearInterval(this.timerInterval);
    
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    const percentage = (this.score / this.questions.length) * 100;
    document.getElementById('scoreValue').textContent = `${this.score}/${this.questions.length}`;
    document.getElementById('scorePercentage').textContent = `${Math.round(percentage)}%`;
    
    // Save to leaderboard
    const leaderboard = Storage.get('quizLeaderboard') || [];
    leaderboard.push({
      score: this.score,
      percentage,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });
    leaderboard.sort((a, b) => b.score - a.score);
    Storage.set('quizLeaderboard', leaderboard.slice(0, 10));
    
    Analytics.trackEvent('quiz_completed', { score: this.score, percentage });
  }
  
  showLeaderboard() {
    const leaderboard = Storage.get('quizLeaderboard') || [];
    const list = document.getElementById('leaderboardList');
    
    list.innerHTML = leaderboard.length === 0 
      ? '<p>No scores yet. Complete a quiz!</p>'
      : leaderboard.map((entry, idx) => `
        <div class="leaderboard-entry">
          <span class="rank">#${idx + 1}</span>
          <span class="score">${entry.score}/100</span>
          <span class="percentage">${entry.percentage}%</span>
          <span class="date">${entry.date}</span>
        </div>
      `).join('');
    
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
  }
  
  hideLeaderboard() {
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
  }
}

window.quizComponent = new QuizComponent();
console.log('[v0] Quiz component loaded');
