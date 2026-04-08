/**
 * CahyASTRO Portal - Dashboard Component
 */

class DashboardComponent {
  constructor() {
    this.init();
  }
  
  init() {
    this.updateStats();
    this.displayChart();
    this.displayActivity();
  }
  
  updateStats() {
    const leaderboard = Storage.get('quizLeaderboard') || [];
    const totalQuizzes = leaderboard.length;
    const avgScore = totalQuizzes > 0 
      ? Math.round(leaderboard.reduce((sum, entry) => sum + entry.percentage, 0) / totalQuizzes)
      : 0;
    
    // Update stat cards
    const statsMap = {
      'totalQuizzes': totalQuizzes,
      'avgScore': avgScore + '%',
      'contentLearned': Math.floor((window.astronomyData?.length || 0) * 0.3),
      'toolsUsed': 20
    };
    
    Object.entries(statsMap).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });
  }
  
  displayChart() {
    const canvas = document.getElementById('performanceChart');
    if (!canvas || typeof CanvasRenderingContext2D === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    const leaderboard = Storage.get('quizLeaderboard') || [];
    
    // Simple chart rendering
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#0a1628';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw grid
    for (let i = 0; i < 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw scores as bars
    ctx.fillStyle = '#00d4ff';
    const barWidth = Math.max(20, width / (leaderboard.length || 1));
    
    leaderboard.forEach((entry, idx) => {
      const x = idx * barWidth + 10;
      const barHeight = (entry.percentage / 100) * (height - 20);
      ctx.fillRect(x, height - barHeight - 10, barWidth - 5, barHeight);
    });
    
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Quiz Performance (${leaderboard.length} quizzes)`, width / 2, height - 5);
  }
  
  displayActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = [
      { action: 'Completed Quiz', score: '85%', time: '2 hours ago' },
      { action: 'Learned about Jupiter', lessons: 3, time: '5 hours ago' },
      { action: 'Used Star Size Calculator', tool: 'Active', time: '1 day ago' },
      { action: 'Completed Quiz', score: '92%', time: '2 days ago' },
      { action: 'Read Astronomy Article', article: 'Black Holes', time: '3 days ago' }
    ];
    
    activityList.innerHTML = activities.map(activity => `
      <div class="activity-item">
        <p class="action">${activity.action}</p>
        <p class="time">${activity.time}</p>
        ${activity.score ? `<p class="score">Score: ${activity.score}</p>` : ''}
        ${activity.lessons ? `<p class="info">Lessons: ${activity.lessons}</p>` : ''}
        ${activity.tool ? `<p class="info">Tool: ${activity.tool}</p>` : ''}
        ${activity.article ? `<p class="info">Article: ${activity.article}</p>` : ''}
      </div>
    `).join('');
  }
}

window.dashboardComponent = new DashboardComponent();
console.log('[v0] Dashboard component loaded');
