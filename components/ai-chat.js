/**
 * CahyASTRO Portal - AI Chat Component
 */

class AIChatComponent {
  constructor() {
    this.chatBox = document.getElementById('chatBox');
    this.chatInput = document.getElementById('chatInput');
    this.sendBtn = document.getElementById('sendBtn');
    this.messageCount = 0;
    
    this.init();
  }
  
  init() {
    if (this.sendBtn) this.sendBtn.addEventListener('click', () => this.sendMessage());
    if (this.chatInput) {
      this.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
    }
  }
  
  async sendMessage() {
    const message = this.chatInput?.value.trim();
    if (!message) return;
    
    // Add user message
    this.addMessage(message, 'user');
    this.chatInput.value = '';
    
    // Show loading
    this.addMessage('Thinking...', 'loading');
    
    try {
      const response = await API.post('/api/chat', { message });
      this.chatBox.lastChild?.remove(); // Remove loading
      this.addMessage(response.response || 'No response', 'bot');
    } catch (error) {
      this.chatBox.lastChild?.remove();
      this.addMessage('Sorry, I encountered an error. Please try again.', 'error');
    }
  }
  
  addMessage(text, type) {
    const messageDiv = DOM.createElement('div', `chat-message ${type}-message`);
    messageDiv.innerHTML = `<p>${String_.sanitize(text)}</p>`;
    this.chatBox?.appendChild(messageDiv);
    this.chatBox?.scrollTop = this.chatBox?.scrollHeight;
  }
}

window.aiChat = new AIChatComponent();
console.log('[v0] AI Chat component loaded');
